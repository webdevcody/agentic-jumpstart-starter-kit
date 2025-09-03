import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware, planAuthMiddleware } from "./middleware";
import {
  findPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  findPlaylistsByUserId,
  countPlaylistsByUserId,
  findPlaylistByIdWithSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
  checkPlaylistOwnership,
  findPublicPlaylists,
} from "~/data-access/playlists";
import { hasValidPlan, getUserPlan } from "~/data-access/users";

export const getPlaylistsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    return await findPlaylistsByUserId(context.userId);
  });

export const getPublicPlaylistsFn = createServerFn().handler(async () => {
  return await findPublicPlaylists(20);
});

export const getPlaylistByIdFn = createServerFn({
  method: "GET",
})
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const playlist = await findPlaylistByIdWithSongs(data.id);
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    return playlist;
  });

export const createPlaylistFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      name: z.string().min(1).max(100),
      description: z.string().max(500).optional(),
      isPublic: z.boolean().default(false),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { userId } = context;
    
    const currentCount = await countPlaylistsByUserId(userId);
    
    const userPlan = await getUserPlan(userId);
    
    if (!userPlan.isActive) {
      throw new Error("Your subscription has expired. Please renew to create playlists.");
    }
    
    if (userPlan.plan === "free") {
      throw new Error("Creating playlists requires a Basic plan or higher.");
    }
    
    if (userPlan.plan === "basic" && currentCount >= 5) {
      throw new Error("Basic plan allows up to 5 playlists. Upgrade to Pro for unlimited playlists.");
    }

    const playlistData = {
      id: crypto.randomUUID(),
      ...data,
      userId,
    };

    const newPlaylist = await createPlaylist(playlistData);
    return newPlaylist;
  });

export const updatePlaylistFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(100).optional(),
      description: z.string().max(500).optional(),
      isPublic: z.boolean().optional(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { id, ...updateData } = data;
    
    const isOwner = await checkPlaylistOwnership(id, context.userId);
    if (!isOwner) {
      throw new Error("Unauthorized: You can only edit your own playlists");
    }

    const updatedPlaylist = await updatePlaylist(id, updateData);
    if (!updatedPlaylist) {
      throw new Error("Failed to update playlist");
    }
    
    return updatedPlaylist;
  });

export const deletePlaylistFn = createServerFn({
  method: "POST",
})
  .validator(z.object({ id: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { id } = data;
    
    const isOwner = await checkPlaylistOwnership(id, context.userId);
    if (!isOwner) {
      throw new Error("Unauthorized: You can only delete your own playlists");
    }

    const deleted = await deletePlaylist(id);
    if (!deleted) {
      throw new Error("Failed to delete playlist");
    }
    
    return { success: true };
  });

export const addSongToPlaylistFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      playlistId: z.string(),
      songId: z.string(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { playlistId, songId } = data;
    
    const isOwner = await checkPlaylistOwnership(playlistId, context.userId);
    if (!isOwner) {
      throw new Error("Unauthorized: You can only modify your own playlists");
    }

    const playlistSong = await addSongToPlaylist(playlistId, songId);
    return playlistSong;
  });

export const removeSongFromPlaylistFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      playlistId: z.string(),
      songId: z.string(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { playlistId, songId } = data;
    
    const isOwner = await checkPlaylistOwnership(playlistId, context.userId);
    if (!isOwner) {
      throw new Error("Unauthorized: You can only modify your own playlists");
    }

    const removed = await removeSongFromPlaylist(playlistId, songId);
    if (!removed) {
      throw new Error("Failed to remove song from playlist");
    }
    
    return { success: true };
  });

export const addSongToSelectedPlaylistFn = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      playlistId: z.string(),
      songId: z.string(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const { playlistId, songId } = data;
    
    const isOwner = await checkPlaylistOwnership(playlistId, context.userId);
    if (!isOwner) {
      throw new Error("Unauthorized: You can only modify your own playlists");
    }

    const playlistSong = await addSongToPlaylist(playlistId, songId);
    return playlistSong;
  });

export const getOrCreateDefaultPlaylistFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context;
    
    // First, try to find an existing playlist for the user
    const existingPlaylists = await findPlaylistsByUserId(userId);
    if (existingPlaylists.length > 0) {
      // Return the most recently created playlist
      return existingPlaylists[0];
    }
    
    // If no playlists exist, create a default one
    const userPlan = await getUserPlan(userId);
    
    if (!userPlan.isActive) {
      throw new Error("Your subscription has expired. Please renew to create playlists.");
    }
    
    if (userPlan.plan === "free") {
      throw new Error("Creating playlists requires a Basic plan or higher.");
    }

    const defaultPlaylistData = {
      id: crypto.randomUUID(),
      name: "My Playlist",
      description: "My first playlist",
      isPublic: false,
      userId,
    };

    const newPlaylist = await createPlaylist(defaultPlaylistData);
    return newPlaylist;
  });

export const getLastPlaylistFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context;
    
    // Get the most recent playlist for the user
    const playlists = await findPlaylistsByUserId(userId);
    if (playlists.length > 0) {
      // Return the most recently created playlist with songs
      const latestPlaylist = await findPlaylistByIdWithSongs(playlists[0].id);
      return latestPlaylist;
    }
    
    return null;
  });
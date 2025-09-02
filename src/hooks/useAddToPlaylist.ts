import { useCallback } from "react";
import { toast } from "sonner";
import { usePlaylist, type PlaylistSong } from "~/components/playlist-provider";

export function useAddToPlaylist() {
  const { playlist, addToPlaylist } = usePlaylist();

  const isInPlaylist = useCallback((songId: string) => {
    return playlist.some(song => song.id === songId);
  }, [playlist]);

  const handleAddToPlaylist = useCallback((song: PlaylistSong) => {
    if (isInPlaylist(song.id)) {
      toast.info(`"${song.title}" is already in your playlist`, {
        description: "This song is already added to your current playlist"
      });
      return;
    }

    addToPlaylist(song);
    toast.success(`Added "${song.title}" to playlist`, {
      description: `by ${song.artist}`
    });
  }, [addToPlaylist, isInPlaylist]);

  return {
    handleAddToPlaylist,
    isInPlaylist
  };
}
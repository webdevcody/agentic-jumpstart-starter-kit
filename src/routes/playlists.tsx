import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaylistCard } from "~/components/PlaylistCard";
import { CreatePlaylistDialog } from "~/components/CreatePlaylistDialog";
import { EditPlaylistDialog } from "~/components/EditPlaylistDialog";
import { SongCard } from "~/components/SongCard";
import { usePlaylist, toPlaylistSong } from "~/components/playlist-provider";
import { usePlaylists, usePlaylistById, useDeletePlaylist } from "~/hooks/usePlaylists";
import { useAudioUrl, useCoverImageUrl } from "~/hooks/useAudioStorage";
// Temporary imports for complex loading logic - to be refactored later
import { getPlaylistByIdFn } from "~/fn/playlists";
import { getAudioUrlFn, getCoverImageUrlFn } from "~/fn/audio-storage";
import { useMutation } from "@tanstack/react-query";
import { Music, Plus, Play, Volume2, Pencil, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export const Route = createFileRoute("/playlists")({
  component: PlaylistsPage,
});

function PlaylistsPage() {
  const {
    loadSavedPlaylist,
    showPlayer,
    currentPlaylistId,
    isPlaying,
    currentSong,
  } = usePlaylist();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Use playlist hooks
  const {
    data: playlists = [],
    isLoading,
    error,
  } = usePlaylists();

  // Get selected playlist with songs
  const { data: selectedPlaylist, isLoading: isLoadingPlaylist } = usePlaylistById(
    selectedPlaylistId || "",
    !!selectedPlaylistId
  );

  // Use delete playlist hook
  const deletePlaylistMutation = useDeletePlaylist();

  // Load playlist mutation for playing (temporary - complex logic to be refactored)
  const loadPlaylistMutation = useMutation({
    mutationFn: getPlaylistByIdFn,
    onSuccess: async (playlistData) => {
      if (playlistData.songs.length === 0) {
        toast.info("This playlist is empty");
        return;
      }

      // Convert songs to PlaylistSong format with URLs
      const playlistSongs = await Promise.all(
        playlistData.songs.map(async (song) => {
          const [audioUrlResult, coverUrlResult] = await Promise.all([
            song.audioKey
              ? getAudioUrlFn({ data: { audioKey: song.audioKey } })
              : Promise.resolve(null),
            song.coverImageKey
              ? getCoverImageUrlFn({ data: { coverKey: song.coverImageKey } })
              : Promise.resolve(null),
          ]);

          return toPlaylistSong({
            ...song,
            audioUrl: audioUrlResult?.audioUrl || "",
            coverImageUrl: coverUrlResult?.coverUrl || null,
          });
        })
      );

      loadSavedPlaylist(playlistData.id, playlistData.name, playlistSongs);
      showPlayer(); // Show the music player
      toast.success(`Now playing "${playlistData.name}"`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to load playlist");
    },
  });

  const handlePlayClick = (playlistId: string) => {
    loadPlaylistMutation.mutate({ data: { id: playlistId } });
  };

  const handleSelectPlaylist = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleDeletePlaylist = () => {
    if (selectedPlaylistId) {
      deletePlaylistMutation.mutate(selectedPlaylistId, {
        onSuccess: () => {
          // Clear selected playlist if it was the one deleted
          setSelectedPlaylistId(null);
          setDeleteDialogOpen(false);
        }
      });
    }
  };

  const handlePlaySong = async (songIndex: number) => {
    if (!selectedPlaylist || selectedPlaylist.songs.length === 0) return;

    // Convert songs to PlaylistSong format with URLs
    const playlistSongs = await Promise.all(
      selectedPlaylist.songs.map(async (song) => {
        const [audioUrlResult, coverUrlResult] = await Promise.all([
          song.audioKey
            ? getAudioUrlFn({ data: { audioKey: song.audioKey } })
            : Promise.resolve(null),
          song.coverImageKey
            ? getCoverImageUrlFn({ data: { coverKey: song.coverImageKey } })
            : Promise.resolve(null),
        ]);

        return toPlaylistSong({
          ...song,
          audioUrl: audioUrlResult?.audioUrl || "",
          coverImageUrl: coverUrlResult?.coverUrl || null,
        });
      })
    );

    loadSavedPlaylist(
      selectedPlaylist.id,
      selectedPlaylist.name,
      playlistSongs,
      songIndex
    );
    showPlayer();
    toast.success(`Now playing "${selectedPlaylist.songs[songIndex].title}"`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Playlists</h1>
            <p className="text-muted-foreground mt-2">
              Organize your favorite songs into custom playlists
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">
              Error loading playlists: {(error as Error).message}
            </p>
          </div>
        )}

        {playlists.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
            {/* Left Column - Playlists */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-card rounded-lg border h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">Your Playlists</h2>
                      <p className="text-sm text-muted-foreground">
                        Select a playlist to view songs
                      </p>
                    </div>
                    <CreatePlaylistDialog
                      trigger={
                        <Button size="sm" className="p-2">
                          <Plus className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 space-y-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="border rounded-lg p-3 animate-pulse"
                        >
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2">
                      {playlists.map((playlist) => (
                        <button
                          key={playlist.id}
                          onClick={() => handleSelectPlaylist(playlist.id)}
                          className={`w-full text-left p-3 rounded-lg border mb-2 transition-all hover:border-primary/50 group ${
                            selectedPlaylistId === playlist.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">
                                {playlist.name}
                              </h3>
                              {playlist.description && (
                                <p className="text-sm text-muted-foreground truncate mt-1">
                                  {playlist.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              {currentPlaylistId === playlist.id &&
                                isPlaying && (
                                  <Badge
                                    variant="default"
                                    className="text-xs bg-green-500"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </Badge>
                                )}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <EditPlaylistDialog
                                  playlist={playlist}
                                  trigger={
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="p-1 h-6 w-6"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </Button>
                                  }
                                />
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayClick(playlist.id);
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
                                >
                                  <Play className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Songs */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-card rounded-lg border h-full flex flex-col">
                {selectedPlaylistId ? (
                  <>
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-semibold text-lg">
                            {selectedPlaylist?.name || "Loading..."}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedPlaylist?.songs?.length || 0} songs
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedPlaylist &&
                            selectedPlaylist.songs.length > 0 && (
                              <Button
                                onClick={() =>
                                  handlePlayClick(selectedPlaylistId)
                                }
                                className="gap-2"
                              >
                                <Play className="w-4 h-4" />
                                Play All
                              </Button>
                            )}
                          {selectedPlaylist && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteDialogOpen(true)}
                              disabled={deletePlaylistMutation.isPending}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                      {isLoadingPlaylist ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div
                              key={i}
                              className="border rounded-lg p-4 animate-pulse"
                            >
                              <div className="aspect-square bg-muted rounded mb-3"></div>
                              <div className="h-4 bg-muted rounded mb-2"></div>
                              <div className="h-3 bg-muted rounded w-2/3"></div>
                            </div>
                          ))}
                        </div>
                      ) : selectedPlaylist?.songs.length ? (
                        <div className="space-y-2">
                          {selectedPlaylist.songs.map((song, index) => {
                            const isCurrentlyPlaying =
                              currentSong?.id === song.id;

                            return (
                              <div
                                key={song.id}
                                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors group cursor-pointer ${
                                  isCurrentlyPlaying
                                    ? "border-primary bg-primary/5 hover:bg-primary/10"
                                    : "hover:bg-muted/50"
                                }`}
                                onClick={() => handlePlaySong(index)}
                              >
                                <div className="w-8 text-sm text-muted-foreground group-hover:hidden">
                                  {isCurrentlyPlaying ? (
                                    <Volume2 className="w-4 h-4 text-primary" />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  className="w-8 h-8 p-0 hidden group-hover:flex"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlaySong(index);
                                  }}
                                >
                                  <Play
                                    className="w-3 h-3"
                                    fill="currentColor"
                                  />
                                </Button>

                                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                                  <Music className="w-5 h-5 text-muted-foreground" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`font-medium truncate ${
                                      isCurrentlyPlaying ? "text-primary" : ""
                                    }`}
                                  >
                                    {song.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate">
                                    {song.artist}
                                  </div>
                                </div>

                                {song.album && (
                                  <div className="hidden sm:block text-sm text-muted-foreground truncate max-w-32">
                                    {song.album}
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  {isCurrentlyPlaying && (
                                    <Badge
                                      variant="default"
                                      className="text-xs bg-primary"
                                    >
                                      <Volume2 className="w-3 h-3 mr-1" />
                                      {isPlaying ? "Playing" : "Paused"}
                                    </Badge>
                                  )}

                                  {song.duration && (
                                    <div className="text-sm text-muted-foreground">
                                      {Math.floor(song.duration / 60)}:
                                      {(song.duration % 60)
                                        .toString()
                                        .padStart(2, "0")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Music className="w-12 h-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No songs in this playlist
                          </h3>
                          <p className="text-muted-foreground">
                            Add some songs to get started
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Select a Playlist
                      </h3>
                      <p className="text-muted-foreground">
                        Choose a playlist from the left to view its songs
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded mb-3"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Music className="w-16 h-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first playlist to organize your favorite songs.
            </p>
            <div className="text-sm text-muted-foreground mb-6">
              <p>Plan limits:</p>
              <p className="mt-1">
                <strong>Basic:</strong> Up to 5 playlists
              </p>
              <p>
                <strong>Pro:</strong> Unlimited playlists
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <CreatePlaylistDialog />
              <Link to="/browse">
                <Button variant="outline">Browse Songs</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Playlist</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedPlaylist?.name}"? This action
                cannot be undone and will permanently remove the playlist and
                all its songs.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deletePlaylistMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeletePlaylist}
                disabled={deletePlaylistMutation.isPending}
              >
                {deletePlaylistMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

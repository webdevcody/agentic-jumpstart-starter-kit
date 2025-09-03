import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPlaylistsFn, getPlaylistByIdFn } from "~/fn/playlists";
import { PlaylistCard } from "~/components/PlaylistCard";
import { CreatePlaylistDialog } from "~/components/CreatePlaylistDialog";
import { usePlaylist, toPlaylistSong } from "~/components/playlist-provider";
import { getAudioUrlFn, getCoverImageUrlFn } from "~/fn/audio-storage";
import { Music, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/playlists")({
  component: PlaylistsPage,
});

function PlaylistsPage() {
  const { loadSavedPlaylist, showPlayer } = usePlaylist();

  const {
    data: playlists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const result = await getPlaylistsFn();
      return result;
    },
  });

  // Load playlist mutation for playing
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
            song.audioKey ? getAudioUrlFn({ data: { audioKey: song.audioKey } }) : Promise.resolve(null),
            song.coverImageKey ? getCoverImageUrlFn({ data: { coverKey: song.coverImageKey } }) : Promise.resolve(null),
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Playlists
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Organize your favorite songs into custom playlists
            </p>
          </div>
          <CreatePlaylistDialog />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-400">
              Error loading playlists: {(error as Error).message}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={{
                  ...playlist,
                  songCount: 0, // We'll add this to the server function later
                }}
                onPlayClick={handlePlayClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Music className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No playlists yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Create your first playlist to organize your favorite songs.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <p>Plan limits:</p>
              <p className="mt-1">
                <strong>Basic:</strong> Up to 5 playlists
              </p>
              <p>
                <strong>Pro:</strong> Unlimited playlists
              </p>
            </div>
            <CreatePlaylistDialog />
          </div>
        )}
      </div>
    </div>
  );
}
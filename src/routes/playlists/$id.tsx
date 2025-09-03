import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlaylistByIdFn,
  addSongToPlaylistFn,
  removeSongFromPlaylistFn,
} from "~/fn/playlists";
import { SongCard } from "~/components/SongCard";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Music, Users, Lock, Plus, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatRelativeTime } from "~/utils/song";
import { toast } from "sonner";

export const Route = createFileRoute("/playlists/$id")({
  component: PlaylistDetailPage,
});

function PlaylistDetailPage() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const {
    data: playlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["playlist", id],
    queryFn: async () => {
      const result = await getPlaylistByIdFn({ data: { id } });
      return result;
    },
  });

  const removeSongMutation = useMutation({
    mutationFn: removeSongFromPlaylistFn,
    onSuccess: () => {
      toast.success("Song removed from playlist");
      queryClient.invalidateQueries({ queryKey: ["playlist", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove song");
    },
  });

  const handleRemoveSong = (songId: string) => {
    removeSongMutation.mutate({
      data: { playlistId: id, songId },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-1/4"></div>
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Playlist Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The playlist you're looking for doesn't exist or you don't have
              permission to view it.
            </p>
            <Link to="/playlists">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Playlists
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/playlists">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Playlists
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {playlist.name}
              </h1>
              {playlist.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {playlist.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  {playlist.songCount} songs
                </span>
                <span>{formatRelativeTime(playlist.createdAt)}</span>
                <div>
                  {playlist.isPublic ? (
                    <Badge variant="secondary" className="text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Public
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {playlist.songs.length > 0 ? (
          <div className="space-y-4">
            {playlist.songs.map((song, index) => (
              <div
                key={song.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400 w-8 text-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <SongCard song={song} />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSong(song.id)}
                  disabled={removeSongMutation.isPending}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Music className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No songs in this playlist yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Browse songs and add them to your playlist to get started.
            </p>
            <Link to="/browse">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Browse Songs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
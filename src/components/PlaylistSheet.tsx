import { Play, Trash2, Music } from "lucide-react";
import { Button } from "~/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from "~/components/ui/sheet";
import { usePlaylist } from "~/components/playlist-provider";
import { formatDuration } from "~/utils/song";
import { EmptyState } from "~/components/EmptyState";

interface PlaylistSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlaylistSheet({ open, onOpenChange }: PlaylistSheetProps) {
  const {
    playlist,
    currentSong,
    currentIndex,
    playSong,
    removeFromPlaylist,
    clearPlaylist,
  } = usePlaylist();

  const handleSongClick = (songId: string, index: number) => {
    const song = playlist.find(s => s.id === songId);
    if (song) {
      playSong(song, index);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Current Playlist</SheetTitle>
          <SheetDescription>
            {playlist.length === 0 
              ? "No songs in your playlist"
              : `${playlist.length} song${playlist.length === 1 ? '' : 's'} in your playlist`
            }
          </SheetDescription>
        </SheetHeader>

        {playlist.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={<Music className="h-12 w-12 text-primary/60" />}
              title="No songs in playlist"
              description="Add songs to your playlist to see them here"
            />
          </div>
        ) : (
          <>
            {/* Clear all button */}
            <div className="px-4 pb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearPlaylist}
                className="w-full"
              >
                Clear All
              </Button>
            </div>

            {/* Songs list */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2 px-4">
                {playlist.map((song, index) => {
                  const isCurrentSong = currentIndex === index;
                  
                  return (
                    <div
                      key={`${song.id}-${index}`}
                      className={`group flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                        isCurrentSong ? 'bg-muted' : ''
                      }`}
                    >
                      {/* Album art and play button */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <div className="w-full h-full bg-muted rounded-md overflow-hidden">
                          {song.coverImageUrl ? (
                            <img
                              src={song.coverImageUrl}
                              alt={`${song.title} cover`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                              <Music className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>

                        {/* Play button overlay */}
                        <button
                          onClick={() => handleSongClick(song.id, index)}
                          className={`absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity ${
                            isCurrentSong ? 'opacity-100' : ''
                          }`}
                        >
                          <Play className="h-5 w-5" fill="currentColor" />
                        </button>
                      </div>

                      {/* Song info */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => handleSongClick(song.id, index)}
                          className="w-full text-left"
                        >
                          <p className={`font-medium truncate ${
                            isCurrentSong ? 'text-primary' : 'text-foreground'
                          }`}>
                            {song.title}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {song.artist}
                            {song.album && ` • ${song.album}`}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            {song.duration && (
                              <span>{formatDuration(song.duration)}</span>
                            )}
                            {song.genre && (
                              <>
                                <span className="mx-1">•</span>
                                <span className="capitalize">{song.genre}</span>
                              </>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromPlaylist(song.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Song } from "~/db/schema";
import type { SongWithUrls } from "~/data-access/songs";

export interface PlaylistSong extends Song {
  audioUrl?: string;
  coverImageUrl?: string | null;
  lastPlayedAt?: number; // Timestamp for shuffle smart selection
}

// Helper to convert SongWithUrls to PlaylistSong
export function toPlaylistSong(song: SongWithUrls): PlaylistSong {
  return {
    ...song,
    lastPlayedAt: undefined,
  };
}

type PlaylistProviderProps = {
  children: React.ReactNode;
};

type PlaylistState = {
  playlist: PlaylistSong[];
  currentSong: PlaylistSong | null;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  isPlayerVisible: boolean;
  hasEverUsedPlayer: boolean;
  // Actions
  addToPlaylist: (song: PlaylistSong) => void;
  removeFromPlaylist: (songId: string) => void;
  clearPlaylist: () => void;
  playSong: (song: PlaylistSong, index?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  updateCurrentTime: (time: number) => void;
  updateDuration: (duration: number) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  showPlayer: () => void;
  hidePlayer: () => void;
};

const PLAYLIST_STORAGE_KEY = "music-playlist";
const PLAYLIST_SETTINGS_KEY = "music-playlist-settings";

const initialState: PlaylistState = {
  playlist: [],
  currentSong: null,
  currentIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isLooping: false,
  isShuffling: false,
  isPlayerVisible: true,
  hasEverUsedPlayer: false,
  // Actions - these will be overridden by the provider
  addToPlaylist: () => null,
  removeFromPlaylist: () => null,
  clearPlaylist: () => null,
  playSong: () => null,
  playNext: () => null,
  playPrevious: () => null,
  togglePlay: () => null,
  seekTo: () => null,
  setVolume: () => null,
  updateCurrentTime: () => null,
  updateDuration: () => null,
  toggleLoop: () => null,
  toggleShuffle: () => null,
  showPlayer: () => null,
  hidePlayer: () => null,
};

const PlaylistContext = createContext<PlaylistState>(initialState);

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const [playlist, setPlaylist] = useState<PlaylistSong[]>([]);
  const [currentSong, setCurrentSong] = useState<PlaylistSong | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [hasEverUsedPlayer, setHasEverUsedPlayer] = useState(false);

  // Load playlist from localStorage on mount
  useEffect(() => {
    try {
      const savedPlaylist = localStorage.getItem(PLAYLIST_STORAGE_KEY);
      const savedSettings = localStorage.getItem(PLAYLIST_SETTINGS_KEY);
      
      if (savedPlaylist) {
        const parsedPlaylist = JSON.parse(savedPlaylist);
        setPlaylist(parsedPlaylist.songs || []);
        setCurrentIndex(parsedPlaylist.currentIndex || -1);
        
        if (parsedPlaylist.currentIndex >= 0 && parsedPlaylist.songs[parsedPlaylist.currentIndex]) {
          setCurrentSong(parsedPlaylist.songs[parsedPlaylist.currentIndex]);
        }
      }
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setVolumeState(parsedSettings.volume || 1);
        setIsLooping(parsedSettings.isLooping || false);
        setIsShuffling(parsedSettings.isShuffling || false);
        setHasEverUsedPlayer(parsedSettings.hasEverUsedPlayer || false);
      }
    } catch (error) {
      console.error("Failed to load playlist from localStorage:", error);
    }
  }, []);

  // Save playlist to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify({
        songs: playlist,
        currentIndex,
      }));
    } catch (error) {
      console.error("Failed to save playlist to localStorage:", error);
    }
  }, [playlist, currentIndex]);

  // Save settings when they change
  useEffect(() => {
    try {
      localStorage.setItem(PLAYLIST_SETTINGS_KEY, JSON.stringify({
        volume,
        isLooping,
        isShuffling,
        hasEverUsedPlayer,
      }));
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
  }, [volume, isLooping, isShuffling, hasEverUsedPlayer]);

  const addToPlaylist = useCallback((song: PlaylistSong) => {
    // Mark that user has used the player
    setHasEverUsedPlayer(true);
    
    setPlaylist(prev => {
      // Check if song already exists in playlist
      const existingIndex = prev.findIndex(s => s.id === song.id);
      if (existingIndex >= 0) {
        // Song already in playlist, play it instead
        const newIndex = existingIndex;
        setCurrentIndex(newIndex);
        setCurrentSong(prev[newIndex]);
        setIsPlaying(true);
        return prev;
      }
      
      // Add new song to playlist
      const newPlaylist = [...prev, song];
      
      // If this is the first song, make it current
      if (prev.length === 0) {
        setCurrentIndex(0);
        setCurrentSong(song);
        setIsPlaying(true);
      }
      
      return newPlaylist;
    });
  }, []);

  const removeFromPlaylist = useCallback((songId: string) => {
    setPlaylist(prev => {
      const songIndex = prev.findIndex(s => s.id === songId);
      if (songIndex === -1) return prev;
      
      const newPlaylist = prev.filter(s => s.id !== songId);
      
      // Adjust current index if needed
      if (songIndex === currentIndex) {
        // Removing current song
        if (newPlaylist.length === 0) {
          setCurrentSong(null);
          setCurrentIndex(-1);
          setIsPlaying(false);
        } else if (songIndex >= newPlaylist.length) {
          // Current was last song, play previous
          const newIndex = Math.max(0, songIndex - 1);
          setCurrentIndex(newIndex);
          setCurrentSong(newPlaylist[newIndex]);
        } else {
          // Play next song at same index
          setCurrentSong(newPlaylist[songIndex]);
        }
      } else if (songIndex < currentIndex) {
        // Adjust index since we removed a song before current
        setCurrentIndex(prev => prev - 1);
      }
      
      return newPlaylist;
    });
  }, [currentIndex]);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    setCurrentSong(null);
    setCurrentIndex(-1);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // Smart shuffle: prioritize songs that haven't been played recently
  const getNextShuffleSong = useCallback(() => {
    if (playlist.length <= 1) return 0;
    
    const now = Date.now();
    const recentPlayThreshold = 10 * 60 * 1000; // 10 minutes
    
    // Create weights for each song based on when they were last played
    const songWeights = playlist.map((song, index) => {
      if (index === currentIndex) return null; // Don't repeat current song
      
      const lastPlayed = song.lastPlayedAt || 0;
      const timeSincePlay = now - lastPlayed;
      
      // Songs never played or played long ago get higher weight
      let weight = 1;
      if (!lastPlayed) {
        weight = 3; // Never played songs get 3x weight
      } else if (timeSincePlay > recentPlayThreshold) {
        weight = 2; // Songs not played recently get 2x weight
      } else {
        weight = 0.3; // Recently played songs get low weight
      }
      
      return { index, weight };
    }).filter((item): item is { index: number; weight: number } => item !== null && item.weight > 0);
    
    if (songWeights.length === 0) {
      // All songs played recently, just pick random
      return Math.floor(Math.random() * playlist.length);
    }
    
    // Weighted random selection
    const totalWeight = songWeights.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of songWeights) {
      random -= item.weight;
      if (random <= 0) {
        return item.index;
      }
    }
    
    return songWeights[0].index;
  }, [playlist, currentIndex]);

  const playSong = useCallback((song: PlaylistSong, index?: number) => {
    let songIndex = index;
    
    if (typeof songIndex === 'undefined') {
      // Find the song in the playlist
      songIndex = playlist.findIndex(s => s.id === song.id);
      if (songIndex === -1) {
        // Song not in playlist, add it and play
        addToPlaylist(song);
        return;
      }
    }
    
    // Update the song's last played timestamp
    setPlaylist(prev => prev.map((s, i) => 
      i === songIndex ? { ...s, lastPlayedAt: Date.now() } : s
    ));
    
    setCurrentSong(song);
    setCurrentIndex(songIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  }, [playlist, addToPlaylist]);

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;
    
    let nextIndex: number;
    
    if (isShuffling) {
      nextIndex = getNextShuffleSong();
    } else {
      nextIndex = currentIndex + 1;
      
      // Handle end of playlist
      if (nextIndex >= playlist.length) {
        if (isLooping) {
          nextIndex = 0; // Loop back to beginning
        } else {
          // End of playlist, stop playing
          setIsPlaying(false);
          return;
        }
      }
    }
    
    const nextSong = playlist[nextIndex];
    
    // Update the song's last played timestamp
    setPlaylist(prev => prev.map((s, i) => 
      i === nextIndex ? { ...s, lastPlayedAt: Date.now() } : s
    ));
    
    setCurrentIndex(nextIndex);
    setCurrentSong(nextSong);
    setCurrentTime(0);
    // Keep playing state
  }, [playlist, currentIndex, isLooping, isShuffling, getNextShuffleSong]);

  const playPrevious = useCallback(() => {
    if (playlist.length === 0) return;
    
    const prevIndex = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
    const prevSong = playlist[prevIndex];
    
    setCurrentIndex(prevIndex);
    setCurrentSong(prevSong);
    setCurrentTime(0);
    // Keep playing state
  }, [playlist, currentIndex]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const seekTo = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  }, []);

  const updateCurrentTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const updateDuration = useCallback((newDuration: number) => {
    setDuration(newDuration);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping(prev => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling(prev => !prev);
  }, []);

  const showPlayer = useCallback(() => {
    setIsPlayerVisible(true);
  }, []);

  const hidePlayer = useCallback(() => {
    setIsPlayerVisible(false);
  }, []);

  const value: PlaylistState = {
    playlist,
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLooping,
    isShuffling,
    isPlayerVisible,
    hasEverUsedPlayer,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    playSong,
    playNext,
    playPrevious,
    togglePlay,
    seekTo,
    setVolume,
    updateCurrentTime,
    updateDuration,
    toggleLoop,
    toggleShuffle,
    showPlayer,
    hidePlayer,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }

  return context;
};
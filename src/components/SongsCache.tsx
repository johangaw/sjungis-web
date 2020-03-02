import React, { useContext, useState } from "react";
import { ISong } from "../etc";

const STORAGE_KEY = "sjungis-settings";

export const SongsCache = React.createContext<{
  cache: ISong[];
  updateCache: (songs: ISong[]) => void;
}>({ cache: [], updateCache: () => null });
SongsCache.displayName = "SongsCacheContext";

export const SongsCacheWrapper = children => {
  const [cache, setCache] = useState(loadSongs());
  const updateCache = (songs: ISong[]) => {
    storeSongs(songs);
    setCache(songs);
  };
  return (
    <SongsCache.Provider value={{ cache, updateCache }}>
      {children}
    </SongsCache.Provider>
  );
};

export const storeSongs = (songs: ISong[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
};

export const loadSongs = (): ISong[] => {
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

import { useState, useEffect } from "react";
import SettingsService from "../services/SettingsService";
import SongService from "../services/SongService";
import { ISong } from "../types/etc";

const songsCacheKey = "sjunis-songs-cache";

const loadSongs = (): ISong[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(songsCacheKey) ?? "");
  } catch {}
  return [];
};

const storeSongs = (songs: ISong[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(songsCacheKey, JSON.stringify(songs));
  } catch {
    localStorage.removeItem(songsCacheKey);
  }
};

export const useCachedSongList = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSongs(loadSongs());

    const showObsceneSongs = SettingsService.showObsceneSongs;
    const byNameAsc = (l: ISong, r: ISong): number =>
      (l.name || "").localeCompare(r.name || "");
    const obsceneSongs = (song: ISong): Boolean =>
      showObsceneSongs || !song.obscene;
    SongService.all()
      .then((songs) => songs.filter(obsceneSongs).sort(byNameAsc))
      .then((songs) => {
        setSongs(songs);
        storeSongs(songs);
      })
      .finally(() => setLoading(false));
  }, []);

  return { songs, loading };
};

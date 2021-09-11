import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ISong } from "../types/etc";
import RoutingService from "../services/RoutingService";
import SettingsService from "../services/SettingsService";
import SongService from "../services/SongService";
import { Spinner } from "../components/Spinner";

const ListSongsPage: NextPage = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const showObsceneSongs = SettingsService.showObsceneSongs;
    const byNameAsc = (l: ISong, r: ISong): number =>
      (l.name || "").localeCompare(r.name || "");
    const obsceneSongs = (song: ISong): Boolean =>
      showObsceneSongs || !song.obscene;
    SongService.all()
      .then((songs) => setSongs(songs.filter(obsceneSongs).sort(byNameAsc)))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center">
      <Spinner></Spinner>
    </div>
  ) : (
    <ul className="list-group">
      {songs.map((song) => (
        <li className="list-group-item list-group-item-action">
          <Link href={RoutingService.showSong(song.urlName)} key={song._id}>
            <a>{song.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListSongsPage;

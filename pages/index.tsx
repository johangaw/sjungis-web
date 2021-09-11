import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Spinner } from "../components/Spinner";
import { useCachedSongList } from "../hooks/useCachedSongs";
import RoutingService from "../services/RoutingService";

const ListSongsPage: NextPage = () => {
  const { songs, loading } = useCachedSongList();

  return (
    <div className="position-relative">
      <ul className="list-group">
        {songs.map((song) => (
          <Link href={RoutingService.showSong(song.urlName)} key={song._id}>
            <li
              className="list-group-item list-group-item-action"
              key={song._id}
            >
              <a>{song.name}</a>
            </li>
          </Link>
        ))}
      </ul>
      {loading && (
        <div
          className="position-absolute"
          style={{ top: "-8px", right: "-8px" }}
        >
          <Spinner></Spinner>
        </div>
      )}
    </div>
  );
};

export default ListSongsPage;

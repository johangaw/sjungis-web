import { useEffect, useState } from "react";
import { ISong } from "../types/etc";
import SongService from "../services/SongService";
import { EditButton } from "../components/EditButton";
import { Spinner } from "../components/Spinner";
import RoutingService from "../services/RoutingService";
import { NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  songId: string;
};

const noteImageStyles = {
  height: "20px",
};

function trimLines(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

export const ShowSong: NextPage<Props> = () => {
  const [song, setSong] = useState<ISong | null>(null);
  const router = useRouter();
  const songId = router.query.songId as string;

  useEffect(() => {
    SongService.get(songId).then((song) => setSong(song));
  }, [songId]);
  return song ? (
    <div>
      <EditButton
        className="float-right"
        onClick={() => router.push(RoutingService.editSong(songId))}
      ></EditButton>
      <h2>{song.name}</h2>
      <p>
        <img
          className="pr-1"
          style={noteImageStyles}
          src="/note.svg"
          alt="Song melody"
        ></img>{" "}
        {song.melody}
      </p>
      <pre>{trimLines(song.lyrics)}</pre>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner></Spinner>
    </div>
  );
};

export default ShowSong;

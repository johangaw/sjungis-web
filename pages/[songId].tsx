import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { all, get } from "../api-helpers/song-storage";
import { EditButton } from "../components/EditButton";
import { Spinner } from "../components/Spinner";
import RoutingService from "../services/RoutingService";
import SongService from "../services/SongService";
import { ISong } from "../types/etc";

type Props = {
  initialSong: ISong;
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

export const ShowSong: NextPage<Props> = ({ initialSong }) => {
  const [song, setSong] = useState(initialSong);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.refresh) {
      setLoading(true);
      SongService.get(song.urlName)
        .then(setSong)
        .then(() => setLoading(false));
    }
  }, [router.query.refresh]);

  return router.isFallback || isLoading ? (
    <div className="d-flex justify-content-center">
      <Spinner></Spinner>
    </div>
  ) : (
    <div>
      <EditButton
        className="float-right"
        onClick={() => router.push(RoutingService.editSong(song.urlName))}
      ></EditButton>
      <h2>{song.name}</h2>
      <p>
        <img
          className="pr-1"
          style={noteImageStyles}
          src="/note.svg"
          alt="Song melody"
        ></img>
        {song.melody}
      </p>
      <pre>{trimLines(song.lyrics)}</pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const song = await get(params?.songId as string).then((song) => ({
    ...song,
    _id: String(song._id),
  }));

  return {
    props: {
      initialSong: song,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await all().then((songs) =>
    songs.map((song) => ({
      params: { songId: decodeURIComponent(song.urlName) },
    }))
  );

  return {
    paths,
    fallback: true,
  };
};

export default ShowSong;

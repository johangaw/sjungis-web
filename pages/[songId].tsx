import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { all, get } from "../api-helpers/song-file";
import { Spinner } from "../components/Spinner";
import { ISong } from "../types/etc";

type Props = {
  song: ISong;
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

export const ShowSong: NextPage<Props> = ({ song }) => {
  const router = useRouter();

  return router.isFallback ? (
    <div className="d-flex justify-content-center">
      <Spinner></Spinner>
    </div>
  ) : (
    <div>
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
  const song = await get(params?.songId as string);

  return {
    props: {
      song,
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

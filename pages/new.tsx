import { useState } from "react";
import SongService from "../services/SongService";
import { SongForm } from "../components/SongForm";
import { ISongParams } from "../types/etc";
import RoutingService from "../services/RoutingService";
import { NextPage } from "next";
import { useRouter } from "next/router";

export const NewSong: NextPage = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (params: ISongParams) => {
    try {
      setProcessing(true);
      const song = await SongService.create(params);
      setProcessing(false);
      router.push(RoutingService.showSong(song.urlName));
    } catch (err) {
      setProcessing(false);
      console.error("kunde inte skapa...", err);
    }
  };

  const emptySong: ISongParams = {
    name: "",
    melody: "",
    lyrics: "",
    obscene: false,
  };

  return (
    <SongForm
      processing={processing}
      song={emptySong}
      onSubmit={onSubmit}
    ></SongForm>
  );
};

export default NewSong;

import React, { useEffect, useState } from "react";
import { ISong, ISongParams } from "../../types/etc";
import RoutingService from "../../services/RoutingService";
import SongService from "../../services/SongService";
import { SongForm } from "../../components/SongForm";
import { Spinner } from "../../components/Spinner";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditSong: NextPage = () => {
  const [song, setSong] = useState<ISong | null>(null);
  const router = useRouter();
  const songId = router.query.songId as string;

  const [processing, setProcessing] = useState<boolean>(false);
  useEffect(() => {
    SongService.get(songId).then((song) => setSong(song));
  }, [songId]);

  const onSubmit = async (params: ISongParams) => {
    try {
      setProcessing(true);
      const updatedSong = await SongService.edit({
        ...song,
        ...params,
      } as ISong);
      setProcessing(false);
      router.push(RoutingService.showSong(updatedSong.urlName, true));
    } catch (err) {
      setProcessing(false);
      console.error("kunde inte updatera...", err);
    }
  };

  return song ? (
    <div>
      <SongForm
        processing={processing}
        song={song}
        onSubmit={onSubmit}
      ></SongForm>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner></Spinner>
    </div>
  );
};

export default EditSong;

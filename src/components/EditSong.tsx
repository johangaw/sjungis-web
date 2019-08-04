import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import SongService from '../services/SongService';
import { SongForm } from './SongForm';
import { ISongParams, ISong } from '../etc';
import { Spinner } from './Spinner';

export const EditSong: React.FunctionComponent<RouteComponentProps<{songId: string}>> = (
  { history, match }
) => {
  const [song, setSong] = useState<ISong|null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  useEffect(() => {
    SongService.get(match.params.songId)
      .then((song) => setSong(song));
  }, [match.params.songId])


  const onSubmit = async (params: ISongParams) => {
    try {
      setProcessing(true);
      const updatedSong = await SongService.edit({...song, ...params} as ISong);
      setProcessing(false);
      history.push(`/${updatedSong.urlName}`);
    } catch(err) {
      setProcessing(false);
      console.error('kunde inte updatera...', err);
    }
  };

  return song
    ? <div><SongForm processing={processing} song={song} onSubmit={onSubmit}></SongForm></div>
    : <div className="d-flex justify-content-center"><Spinner></Spinner></div>

}
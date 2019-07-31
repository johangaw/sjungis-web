import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import SongService from '../services/SongService';
import { SongForm } from './SongForm';
import { ISongParams, ISong } from '../etc';

export const EditSong: React.FunctionComponent<RouteComponentProps<{songId: string}>> = (
  { history, match }
) => {

  const onSubmit = async (params: ISongParams) => {
    try {
      const song = await SongService.edit({...params, _id: match.params.songId});
      history.push(`/låt/${song._id}`);
    } catch(err) {
      console.error('kunde inte updatera...', err);
    }
  };

  const [song, setSong] = useState<ISong|null>(null);
  useEffect(() => {
    SongService.get(match.params.songId)
      .then((song) => setSong(song));
  }, [match.params.songId])

  return song
    ? <SongForm song={song} onSubmit={onSubmit}></SongForm>
    : <div>Loading...</div>
}
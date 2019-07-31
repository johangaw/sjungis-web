import React from 'react';
import { RouteComponentProps } from 'react-router';
import SongService from '../services/SongService';
import { SongForm } from './SongForm';
import { ISongParams } from '../etc';

export const NewSong: React.FunctionComponent<RouteComponentProps<{}>> = (
  { history }
) => {
  const onSubmit = async (params: ISongParams) => {
    try {
      const song = await SongService.create(params);
      history.push(`/låt/${song._id}`);
    } catch(err) {
      console.error('kunde inte skapa...', err);
    }
  };

  const emptySong: ISongParams = {
    name: '',
    melody: '',
    lyrics: '',
  }

  return <SongForm song={emptySong} onSubmit={onSubmit}></SongForm>
}
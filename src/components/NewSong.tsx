import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import SongService from '../services/SongService';
import { SongForm } from './SongForm';
import { ISongParams } from '../etc';
import RoutingService from '../services/RoutingService';

export const NewSong: React.FunctionComponent<RouteComponentProps<{}>> = (
  { history }
) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const onSubmit = async (params: ISongParams) => {
    try {
      setProcessing(true);
      const song = await SongService.create(params);
      setProcessing(false);
      history.push(RoutingService.showSong(song.urlName));
    } catch(err) {
      setProcessing(false);
      console.error('kunde inte skapa...', err);
    }
  };

  const emptySong: ISongParams = {
    name: '',
    melody: '',
    lyrics: '',
    obscene: false,
  }

  return <SongForm processing={processing} song={emptySong} onSubmit={onSubmit}></SongForm>
}
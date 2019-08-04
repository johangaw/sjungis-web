import React, { useEffect, useState } from 'react';
import { ISong } from '../etc';
import { RouteComponentProps } from 'react-router-dom';
import SongService from '../services/SongService';
import { EditButton } from './utils/EditButton';
import { Spinner } from './utils/Spinner';
import RoutingService from '../services/RoutingService';

type Props = {
  songId: string;
}

const noteImageStyles = {
  height: '20px'
}

function trimLines(text: string): string {
  return text
    .split('\n')
    .map(line => line.trim())
    .join('\n');
}

export const ShowSong: React.FunctionComponent<RouteComponentProps<Props>> = (
  { match, history }
) => {
  const [song, setSong] = useState<ISong|null>(null);
  useEffect(() => {
    SongService.get(match.params.songId)
      .then((song) => setSong(song));
  }, [match.params.songId])
  return song
    ? <div>
        <EditButton className="float-right" onClick={() => history.push(RoutingService.editSong(match.params.songId)) }></EditButton>
        <h2>{song.name}</h2>
        <p>
          <img className="pr-1" style={noteImageStyles} src={process.env.PUBLIC_URL + '/note.svg'}></img> {song.melody}
        </p>
        <pre>
          {trimLines(song.lyrics)}
        </pre>
      </div>
    : <div className="d-flex justify-content-center"><Spinner></Spinner></div>
}

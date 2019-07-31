import React, { useEffect, useState } from 'react';
import { ISong } from '../etc';
import { RouteComponentProps } from 'react-router-dom';
import SongService from '../services/SongService';

type Props = {
  songId: string;
}

function trimLines(text: string): string {
  return text
    .split('\n')
    .map(line => line.trim())
    .join('\n');
}

export const ShowSong: React.FunctionComponent<RouteComponentProps<Props>> = (
  { match }
) => {
  const [song, setSong] = useState<ISong|null>(null);
  useEffect(() => {
    SongService.get(match.params.songId)
      .then((song) => setSong(song));
  }, [match.params.songId])
  return song
    ? <div>
        <h2>{song.name}</h2>
        <p>Mel: {song.melody}</p>
        <pre>
          {trimLines(song.lyrics)}
        </pre>
      </div>
    : <div>Loading...</div>
}

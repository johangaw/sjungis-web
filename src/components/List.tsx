import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ISong } from '../etc';
import SongService from '../services/SongService';

export const List: React.FC = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  useEffect(() => {
    SongService.all().then(songs => setSongs(songs));
  }, [])

  return <ul className="list-group">
    {songs.map(song => 
      <Link className="list-group-item list-group-item-action" key={song.id} to={'/låt/' + song.id}>{song.id}. {song.name}</Link>
    )}
  </ul>
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ISong } from '../etc';
import RoutingService from '../services/RoutingService';
import SettingsService from '../services/SettingsService';
import SongService from '../services/SongService';
import { Spinner } from './utils/Spinner';

export const ListSongs: React.FC = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const showObsceneSongs = SettingsService.showObsceneSongs;
    const byNameAsc = (l: ISong, r: ISong): number => (l.name || '').localeCompare(r.name || '')
    const obsceneSongs = (song: ISong): Boolean => showObsceneSongs || !song.obscene
    SongService.all()
      .then(songs => setSongs(songs.filter(obsceneSongs).sort(byNameAsc)))
      .finally(() => setLoading(false))
  }, [])

  return loading
    ? <div className="d-flex justify-content-center"><Spinner></Spinner></div>
    : <ul className="list-group">
      {songs.map(song => 
        <Link className="list-group-item list-group-item-action" key={song._id} to={RoutingService.showSong(song.urlName)}>{song.name}</Link>
      )}
    </ul>
}
import React from 'react';
import { RouteComponentProps } from 'react-router';
import SongService from '../services/SongService';

export const NewSong: React.FunctionComponent<RouteComponentProps<{}>> = (
  { history }
) => {

  const onSubmit = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();    
    try {
      const song = await SongService.create({
        lyrics: event.target.lyrics.value,
        name: event.target.name.value,
        melody: event.target.melody.value,
      });
      history.push(`/låt/${song.id}`);
    } catch(err) {
      console.error('kunde inte skapa...', err);
    }
  };
  

  return <form autoComplete={'no'} onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="name">Titel</label>
      <input className="form-control" id="name" name="name"></input>
    </div>
    <div className="form-group">
      <label htmlFor="melody">Melodi</label>
      <input className="form-control" id="melody"></input>
    </div>
    <div className="form-group">
      <label htmlFor="lyrics">Text</label>
      <textarea className="form-control" id="lyrics" rows={12}></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Skapa</button>
  </form>
}
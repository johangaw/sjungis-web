import React, { useState } from 'react';
import { ISongParams } from '../etc';

type Props = {
  song: ISongParams;
  onSubmit: (song: ISongParams) => void;
}

export const SongForm: React.FunctionComponent<Props> = (
  { song: initialSong, onSubmit }
) => {
  const [name, setName] = useState<string>(initialSong.name);
  const [melody, setMelody] = useState<string>(initialSong.melody);
  const [lyrics, setLyrics] = useState<string>(initialSong.lyrics);
  const handleSubmit = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    onSubmit({name, melody, lyrics});
  }

  return <form autoComplete={'no'} onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Titel</label>
      <input className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
    </div>
    <div className="form-group">
      <label htmlFor="melody">Melodi</label>
      <input className="form-control" id="melody" value={melody} onChange={(event) => setMelody(event.target.value)}></input>
    </div>
    <div className="form-group">
      <label htmlFor="lyrics">Text</label>
      <textarea className="form-control" id="lyrics" rows={12} value={lyrics} onChange={(event) => setLyrics(event.target.value)}></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Spara</button>
  </form>
}

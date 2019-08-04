import React, { useState } from 'react';
import { ISongParams } from '../etc';
import { Spinner } from './utils/Spinner';

type Props = {
  song: ISongParams;
  onSubmit: (song: ISongParams) => Promise<void>;
  processing?: boolean;
}

export const SongForm: React.FunctionComponent<Props> = (
  { song: initialSong, onSubmit, processing }
) => {
  const [name, setName] = useState<string>(initialSong.name);
  const [melody, setMelody] = useState<string>(initialSong.melody);
  const [lyrics, setLyrics] = useState<string>(initialSong.lyrics);

  const handleSubmit = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    onSubmit({name, melody, lyrics});
  }

  return <form autoComplete={'off'} onSubmit={handleSubmit}>
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
    <div className="d-flex">
      <button type="submit" disabled={processing} className="btn btn-primary mr-3">Spara</button>
      {processing ? <Spinner></Spinner> : null}
    </div>
  </form>
}

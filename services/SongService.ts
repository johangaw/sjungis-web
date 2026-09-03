import { ISong } from "../types/etc";

function parseResponse<T>(): (res: Response) => Promise<T> {
  return async (response) => {
    if (200 <= response.status && response.status < 400) {
      return response.json();
    }
    throw await response.json();
  };
}

function getJSON<T>(url: string): Promise<T> {
  return fetch(url).then(parseResponse());
}

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

class SongService {
  all(): Promise<ISong[]> {
    return getJSON<ISong[]>(`/songs.json`).then((songs) =>
      songs.map((song) => ({ ...song, obscene: !!song.obscene }))
    );
  }

  get(urlName: string): Promise<ISong> {
    const wanted = decodeSafe(urlName);
    return this.all().then((songs) => {
      const song = songs.find((song) => decodeSafe(song.urlName) === wanted);
      if (!song) {
        throw Error(`Could not found song with urlName: ${urlName}`);
      }
      return song;
    });
  }
}

export default new SongService();

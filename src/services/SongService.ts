import { ISong, ISongParams } from "../etc";

function parseResponse<T>(): (res: Response) => Promise<T> {
  return async (response) => {
    if (200 <= response.status && response.status < 400) {
      return response.json();
    }
    throw await response.json();
  };
}

function getJSON<T>(url: string): Promise<T> {
  return fetch(url).then(parseResponse())
}

function sendJSON<T>(url: string, data: any, method: 'PUT'|'POST'): Promise<T> {
  return fetch(
    url,
    {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  ).then(parseResponse())
}

class SongService {
  all(): Promise<ISong[]> {
    return getJSON('http://localhost:8080/api/v1/songs');
  }

  get(id: string): Promise<ISong> {
    return getJSON(`http://localhost:8080/api/v1/songs/${id}`);
  }

  create(songParam: ISongParams): Promise<ISong> {
    return sendJSON('http://localhost:8080/api/v1/songs', songParam, 'POST');
  }

  edit(song: ISong): Promise<ISong> {
    return sendJSON(`http://localhost:8080/api/v1/songs/${song.id}`, song, 'PUT');
  }
}

export default new SongService();

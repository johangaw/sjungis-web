import { ISong } from "../etc";

function getJSON<T>(url: string): Promise<T> {
  return fetch(url)
    .then(async (response) => {
        if (response.status !== 200) {
          throw await response.json();
        }
        return response.json();
      }
    )
}

function postJSON<T>(url: string, data: any): Promise<T> {
  return fetch(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  ).then(async (response) => {
        if (response.status !== 201) {
          throw await response.json();
        }
        return response.json();
      }
    )
}

class SongService {
  all(): Promise<ISong[]> {
    return getJSON('http://localhost:8080/api/v1/songs');
  }

  get(id: string): Promise<ISong> {
    return getJSON(`http://localhost:8080/api/v1/songs/${id}`);
  }

  create(songParam: Omit<ISong, 'id'>): Promise<ISong> {
    return postJSON('http://localhost:8080/api/v1/songs', songParam);
  }
}

export default new SongService();

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

class SongService {
  all(): Promise<ISong[]> {
    return getJSON('http://localhost:8080/api/v1/songs');
  }

  get(id: string): Promise<ISong> {
    return getJSON(`http://localhost:8080/api/v1/songs/${id}`);
  }
}

export default new SongService();

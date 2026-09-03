import { promises as fs } from "fs";
import path from "path";
import { ISong } from "../types/etc";

const songsFile = path.join(process.cwd(), "public", "songs.json");

function normalize(song: ISong): ISong {
  return {
    ...song,
    _id: String(song._id),
    obscene: !!song.obscene,
  };
}

export async function all(): Promise<ISong[]> {
  const content = await fs.readFile(songsFile, "utf-8");
  return (JSON.parse(content) as ISong[]).map(normalize);
}

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function get(urlName: string): Promise<ISong> {
  const songs = await all();
  const wanted = decodeSafe(urlName);
  const song = songs.find((song) => decodeSafe(song.urlName) === wanted);
  if (!song) {
    throw Error(`Could not found song with urlName: ${urlName}`);
  }
  return song;
}

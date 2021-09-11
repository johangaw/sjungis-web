import { ISong, ISongParams, ISongWithoutId } from "../types/etc";
import { MongoClient, Collection, ObjectId } from "mongodb";

const getMongoUrl = () =>
  process.env["MONGODB_URL"] || "mongodb://localhost:27017/sjungis";

function getURL(name: string): string {
  return encodeURIComponent(name);
}

async function createURL(name: string, id?: string): Promise<string> {
  const [col, client] = await songsCollection();
  let urlName = getURL(name);

  while (true) {
    const results = await col.find({ urlName: urlName }).toArray();
    if (
      results.length === 0 ||
      (results.length === 1 && !!id && new ObjectId(results[0]._id).equals(id))
    ) {
      client.close();
      return urlName;
    } else {
      urlName = getURL(`${name} ${new Date().getMilliseconds()}`);
    }
  }
}

export async function songsCollection(): Promise<
  [Collection<ISong>, MongoClient]
> {
  const client = await MongoClient.connect(getMongoUrl());
  const db = client.db();
  const collection = db.collection<ISong>("songs");
  return [collection, client];
}

export async function all(): Promise<ISong[]> {
  const [col, client] = await songsCollection();
  const songs = await col.find().toArray();
  client.close();
  return songs;
}

export async function get(urlName: string): Promise<ISong> {
  const [col, client] = await songsCollection();
  const song = await col.findOne({ urlName: getURL(urlName) });
  client.close();
  if (!song) {
    throw Error(`Could not found song with urlName: ${urlName}`);
  }
  return song;
}

export async function create(songParams: ISongParams): Promise<ISong> {
  const [col, client] = await songsCollection();
  const song: ISongWithoutId = {
    ...songParams,
    urlName: await createURL(songParams.name),
  };
  const result = await col.insertOne(song as any);
  client.close();
  if (result.acknowledged) {
    return { ...song, _id: result.insertedId };
  } else {
    throw "Could not create song";
  }
}

export async function edit(song: ISong): Promise<ISong> {
  const [col, client] = await songsCollection();
  const { name, lyrics, melody, obscene } = song;
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(song._id) },
    {
      $set: {
        name,
        lyrics,
        melody,
        obscene,
        urlName: await createURL(song.name, song._id),
      },
    },
    {
      returnDocument: "after",
    }
  );
  client.close();
  if (result.value) {
    return result.value;
  } else {
    throw "Could not update song";
  }
}

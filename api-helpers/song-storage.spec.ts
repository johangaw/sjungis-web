process.env.MONGODB_URL = "mongodb://localhost:27017/sjungis-test";

import { all, songsCollection, edit, create } from "./song-storage";
import { MongoClient, Collection, ObjectId } from "mongodb";
import { ISong } from "../types/etc";

let col: Collection<ISong>, client: MongoClient;

beforeEach(async () => {
  [col, client] = await songsCollection();
  await col.deleteMany({});
});

afterEach(async () => {
  await col.deleteMany({});
  await client.close();
});

describe("all", () => {
  describe("when the db is empty", () => {
    it("return an empty array", async () => {
      expect(await all()).toHaveLength(0);
    });
  });
});

describe("edit", () => {
  it("does not change the urlName", async () => {
    const song = {
      name: "name",
      melody: "mel 1",
      urlName: "name",
      lyrics: "lyrics",
      obscene: true,
      _id: undefined as any,
    };
    const result = await col.insertOne(song);
    await edit({ ...song, melody: "mel 2", obscene: false });
    const updatedSong = await col.findOne({ _id: result.insertedId });
    expect(updatedSong?.name).toBe("name");
    expect(updatedSong?.melody).toBe("mel 2");
    expect(updatedSong?.lyrics).toBe("lyrics");
    expect(updatedSong?.urlName).toBe("name");
    expect(updatedSong?.obscene).toBe(false);
  });
});

describe("create", () => {
  it("sets the urlName to the name", async () => {
    const song = await create({
      name: "name",
      melody: "mel 1",
      lyrics: "lyrics",
      obscene: true,
    });
    const created = await col.findOne({ _id: new ObjectId(song._id) });
    expect(created?.name).toBe("name");
    expect(created?.melody).toBe("mel 1");
    expect(created?.lyrics).toBe("lyrics");
    expect(created?.urlName).toBe("name");
    expect(created?.obscene).toBe(true);
  });

  describe("when creating a second song the the same name", () => {
    it("invent a nameUrl for the second one", async () => {
      const song1 = await create({
        name: "name",
        melody: "mel 1",
        lyrics: "lyrics",
        obscene: false,
      });
      const created1 = await col.findOne({ _id: new ObjectId(song1._id) });
      expect(created1?.urlName).toBe("name");

      const song2 = await create({
        name: "name",
        melody: "mel 1",
        lyrics: "lyrics",
        obscene: false,
      });
      const created2 = await col.findOne({ _id: new ObjectId(song2._id) });
      expect(created2?.urlName).not.toBe("name");
      expect(created2?.urlName.startsWith("name")).toBe(true);
    });
  });
});

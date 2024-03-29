export interface ISong {
  _id: string;
  name: string;
  lyrics: string;
  melody: string;
  urlName: string;
  obscene: boolean;
}

export type ISongWithoutId = Omit<ISong, "_id">;

export type ISongParams = Pick<ISong, "name" | "lyrics" | "melody" | "obscene">;

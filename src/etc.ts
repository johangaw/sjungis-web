
export interface ISong {
  _id: string;
  name: string;
  lyrics: string;
  melody: string;
}

export type ISongParams = Omit<ISong, '_id'>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

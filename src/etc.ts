
export interface ISong {
  id: string;
  name: string;
  lyrics: string;
  melody: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

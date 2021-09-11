import type { NextApiRequest, NextApiResponse } from "next";
import { all, create } from "../../../api-helpers/song-storage";
import { ISongParams } from "../../../types/etc";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const songs = await all();
      res.status(200).json(songs);
      break;

    case "POST":
      const song = await create(req.body as ISongParams);
      res.status(201).send(song);
      break;

    default:
      res.status(404).json({});
      break;
  }
};

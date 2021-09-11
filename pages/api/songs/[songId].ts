import type { NextApiRequest, NextApiResponse } from "next";
import { edit, get } from "../../../api-helpers/song-storage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const songId = req.query.songId as string;
  switch (req.method) {
    case "GET":
      const songs = await get(songId);
      res.status(200).json(songs);
      break;

    case "PUT":
      const song = await edit({ ...req.body, _id: songId });
      res.status(200).send(song);
      break;

    default:
      res.status(404).json({});
      break;
  }
};

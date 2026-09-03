import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "../../../api-helpers/song-file";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const songId = req.query.songId as string;
  switch (req.method) {
    case "GET":
      const songs = await get(songId);
      res.status(200).json(songs);
      break;

    default:
      res.status(404).json({});
      break;
  }
};

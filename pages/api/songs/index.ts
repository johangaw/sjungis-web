import type { NextApiRequest, NextApiResponse } from "next";
import { all } from "../../../api-helpers/song-file";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const songs = await all();
      res.status(200).json(songs);
      break;

    default:
      res.status(404).json({});
      break;
  }
};

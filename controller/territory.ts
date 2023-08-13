import axios from "axios";
import { Request, Response } from "express";

import { externalApi } from "../config/env";

const getTerritories = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get<RawTerritory[]>(`${externalApi}/territories/all`);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: (<ResponseError>err).response.data.message });
  }
};

export { getTerritories };

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Beeper, statuses } from "../models/types.js";
import { Latitude, Longitude } from "../models/latAndLon.js";
import {
  readFromJsonFile,
  writeBeeperToJsonFile,
  writeListBeepersToJsonFile,
} from "../DAL/jsonBeeper.js";
import { promises } from "dns";

export const createBeeper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    const newBeeper = {
      id: uuidv4(),
      name: name,
      status: statuses[0],
      created_at: new Date(),
    };
    await writeBeeperToJsonFile(newBeeper);

    res.status(201).json({ "the new beeper": newBeeper });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const getAllBeepers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const beepers: Beeper[] = await readFromJsonFile();
    res.status(201).json({ beepers: beepers });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const getBeeperById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const beepers: Beeper[] = await readFromJsonFile();

  const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
  if (findindexOfBeeper !== -1) {
    res.status(200).json(beepers[findindexOfBeeper]);
  } else {
    res.status(400).json({ massage: "error" });
  }
};

export const deleteBeeper = async (req: Request, res: Response) => {
  const { id } = req.params;

  let beepers: Beeper[] = await readFromJsonFile();

  const findindexOfBeeper = beepers.findIndex((b) => b.id === id);

  if (findindexOfBeeper !== -1) {
    beepers.splice(findindexOfBeeper, 1);
    await writeListBeepersToJsonFile(beepers);
    res.status(200).json({ beepers: "good" });
  } else {
    res.status(400).json({ massage: "error" });
  }
};

export const putBeeper = async (req: Request, res: Response) => {
  const { LAT, LON } = req.body;
  const { id } = req.params;

  let beepers: Beeper[] = await readFromJsonFile();

  const findBeeper: number = beepers.findIndex((b) => b.id === id)!;

  const indexOfCurrentStatus = statuses.indexOf(beepers[findBeeper].status);

  if (beepers[findBeeper].status === statuses[2]) {
    const lat: number = Latitude.findIndex((lat) => lat === LAT);
    const lon: number = Longitude.findIndex((lon) => lon === LON);
    if (lat === -1 || lon === -1 || lat !== lon) {
      res.status(400).json({ massage: "lat or lon is not good" });
      return;
    }
    beepers[findBeeper].latitude = LAT;
    beepers[findBeeper].longitude = LON;
  }
  beepers[findBeeper]!.status = statuses[indexOfCurrentStatus + 1];
  await writeListBeepersToJsonFile(beepers);
  res.status(200).json({ massage: beepers });
};

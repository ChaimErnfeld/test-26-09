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
import {
  addBeeper,
  getBeepers,
  getBeeper,
  getBeeperByStatuses,
  deletee,
  put,
} from "../services/beeperService.js";

export const createBeeper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const newBeeper = await addBeeper(name);

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
    const beepers: Beeper[] = await getBeepers();
    res.status(201).json({ beepers: beepers });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const getBeeperById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const beeper: Beeper | number = await getBeeper(id);
    if (typeof beeper !== "number") {
      res.status(200).json(beeper);
    } else {
      res.status(400).json({ error: "beeper is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const getBeepersByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.params;

    const beepers: Beeper[] = await getBeeperByStatuses(status);
    res.status(200).json(beepers);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const deleteBeeper = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const beepers: Beeper[] | number = await deletee(id);
    if (typeof beepers !== "number") {
      res.status(200).json({ massage: "beeper Deleted successfully" });
    } else {
      res.status(400).json({ error: "beeper is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export const putBeeper = async (req: Request, res: Response) => {
  try {
    const { LAT, LON } = req.body;
    const { id } = req.params;

    const beeper: Beeper | number = await put(id, LAT, LON);

    if (typeof beeper !== "number") {
      res.status(200).json(beeper);
    } else if (beeper === -1) {
      res.status(400).json({ massage: "The status cannot be changed" });
    } else if (beeper === -2) {
      res
        .status(400)
        .json({ massage: "lat or lon is not good or beeper is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Beeper, statuses } from "../models/types.js";
import { Latitude, Longitude } from "../models/latAndLon.js";
import {
  readFromJsonFile,
  writeBeeperToJsonFile,
  writeListBeepersToJsonFile,
} from "../DAL/jsonBeeper.js";

export const addBeeper = async (name: string): Promise<Beeper> => {
  const newBeeper = {
    id: uuidv4(),
    name: name,
    status: statuses[0],
    created_at: new Date(),
  };
  await writeBeeperToJsonFile(newBeeper);
  return newBeeper;
};

export const getBeepers = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await readFromJsonFile();
  return beepers;
};

export const getBeeper = async (id: string): Promise<Beeper | number> => {
  const beepers: Beeper[] = await readFromJsonFile();

  const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
  if (findindexOfBeeper !== -1) {
    return beepers[findindexOfBeeper];
  } else {
    return -1;
  }
};
export const getBeeperByStatuses = async (
  status: string
): Promise<Beeper[]> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beepersByStatus: Beeper[] = beepers.filter((b) => b.status === status);
  return beepersByStatus;
};
export const deletee = async (id: string): Promise<Beeper[] | number> => {
  let beepers: Beeper[] = await readFromJsonFile();

  const findindexOfBeeper = beepers.findIndex((b) => b.id === id);

  if (findindexOfBeeper !== -1) {
    beepers.splice(findindexOfBeeper, 1);
    await writeListBeepersToJsonFile(beepers);
    return beepers;
  } else {
    return -1;
  }
};
export const put = async (
  id: string,
  LAT: number,
  LON: number
): Promise<Beeper | number> => {
  const beepers: Beeper[] = await readFromJsonFile();

  const findBeeper: number = beepers.findIndex((b) => b.id === id)!;

  const indexOfCurrentStatus = statuses.indexOf(beepers[findBeeper].status);

  if (
    beepers[findBeeper].status === statuses[3] ||
    beepers[findBeeper].status === statuses[4]
  ) {
    return -1;
  }
  if (beepers[findBeeper].status === statuses[2]) {
    const lat: number = Latitude.findIndex((lat) => lat === LAT);
    const lon: number = Longitude.findIndex((lon) => lon === LON);
    if (lat === -1 || lon === -1 || lat !== lon) {
      return -2;
    }
    beepers[findBeeper].latitude = LAT;
    beepers[findBeeper].longitude = LON;

    beepers[findBeeper]!.status = statuses[indexOfCurrentStatus + 1];
    await writeListBeepersToJsonFile(beepers);

    changeStatusToDetonated(findBeeper);
    return beepers[findBeeper];
  } else {
    beepers[findBeeper]!.status = statuses[indexOfCurrentStatus + 1];
    await writeListBeepersToJsonFile(beepers);
    return beepers[findBeeper];
  }
};
export const changeStatusToDetonated = async (beeper: number) => {
  const beepers: Beeper[] = await readFromJsonFile();
  setTimeout(() => {
    beepers[beeper].status = statuses[4];
    beepers[beeper].detonated_at = new Date();
    writeListBeepersToJsonFile(beepers);
  }, 10000);
};

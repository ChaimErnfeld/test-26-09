import jsonfile from "jsonfile";
import { Beeper } from "../models/types.js";

const DB_FILE_PATH = "./data/db.json";

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};

export const writeBeeperToJsonFile = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  //   const indexOfBeeper = beepers.findIndex((b) => b.id === beeper.id);
  //   if (indexOfBeeper !== -1) {
  //     beepers[indexOfBeeper].status = beeper.status;
  //   } else {
  //     beepers.push(beeper);
  //   }
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const writeListBeepersToJsonFile = async (
  beepers: Beeper[]
): Promise<void> => {
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

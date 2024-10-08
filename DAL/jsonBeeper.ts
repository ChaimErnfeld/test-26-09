import jsonfile from "jsonfile";
import { Beeper } from "../models/types.js";

const DB_FILE_PATH = "./data/db.json";

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};

export const writeBeeperToJsonFile = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const writeListBeepersToJsonFile = async (
  beepers: Beeper[]
): Promise<void> => {
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

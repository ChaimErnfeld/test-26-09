var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { statuses } from "../models/types.js";
import { Latitude, Longitude } from "../models/latAndLon.js";
import { readFromJsonFile, writeBeeperToJsonFile, writeListBeepersToJsonFile, } from "../DAL/jsonBeeper.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newBeeper = {
            id: uuidv4(),
            name: name,
            status: statuses[0],
            created_at: new Date(),
        };
        yield writeBeeperToJsonFile(newBeeper);
        res.status(201).json({ "the new beeper": newBeeper });
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield readFromJsonFile();
        res.status(201).json({ beepers: beepers });
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const beepers = yield readFromJsonFile();
    const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
    if (findindexOfBeeper !== -1) {
        res.status(200).json(beepers[findindexOfBeeper]);
    }
    else {
        res.status(400).json({ massage: "error" });
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let beepers = yield readFromJsonFile();
    const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
    if (findindexOfBeeper !== -1) {
        beepers.splice(findindexOfBeeper, 1);
        yield writeListBeepersToJsonFile(beepers);
        res.status(200).json({ beepers: "good" });
    }
    else {
        res.status(400).json({ massage: "error" });
    }
});
export const putBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { LAT, LON } = req.body;
    const { id } = req.params;
    const beepers = yield readFromJsonFile();
    const findBeeper = beepers.findIndex((b) => b.id === id);
    const indexOfCurrentStatus = statuses.indexOf(beepers[findBeeper].status);
    if (beepers[findBeeper].status === statuses[2]) {
        const lat = Latitude.findIndex((lat) => lat === LAT);
        const lon = Longitude.findIndex((lon) => lon === LON);
        if (lat === -1 || lon === -1 || lat !== lon) {
            res.status(400).json({ massage: "lat or lon is not good" });
            return;
        }
        beepers[findBeeper].latitude = LAT;
        beepers[findBeeper].longitude = LON;
        beepers[findBeeper].status = statuses[indexOfCurrentStatus + 1];
        yield writeListBeepersToJsonFile(beepers);
        changeStatusToDetonated(findBeeper);
    }
    else {
        beepers[findBeeper].status = statuses[indexOfCurrentStatus + 1];
        yield writeListBeepersToJsonFile(beepers);
        res.status(200).json({ massage: beepers });
    }
});
export const changeStatusToDetonated = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    setTimeout(() => {
        beepers[beeper].status = statuses[4];
        beepers[beeper].detonated_at = new Date();
        writeListBeepersToJsonFile(beepers);
    }, 10000);
});

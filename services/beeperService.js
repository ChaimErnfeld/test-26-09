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
export const addBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeeper = {
        id: uuidv4(),
        name: name,
        status: statuses[0],
        created_at: new Date(),
    };
    yield writeBeeperToJsonFile(newBeeper);
    return newBeeper;
});
export const getBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    return beepers;
});
export const getBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
    if (findindexOfBeeper !== -1) {
        return beepers[findindexOfBeeper];
    }
    else {
        return -1;
    }
});
export const getBeeperByStatuses = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beepersByStatus = beepers.filter((b) => b.status === status);
    return beepersByStatus;
});
export const deletee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let beepers = yield readFromJsonFile();
    const findindexOfBeeper = beepers.findIndex((b) => b.id === id);
    if (findindexOfBeeper !== -1) {
        beepers.splice(findindexOfBeeper, 1);
        yield writeListBeepersToJsonFile(beepers);
        return beepers;
    }
    else {
        return -1;
    }
});
export const put = (id, LAT, LON) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const findBeeper = beepers.findIndex((b) => b.id === id);
    const indexOfCurrentStatus = statuses.indexOf(beepers[findBeeper].status);
    if (beepers[findBeeper].status === statuses[3] ||
        beepers[findBeeper].status === statuses[4]) {
        return -1;
    }
    if (beepers[findBeeper].status === statuses[2]) {
        const lat = Latitude.findIndex((lat) => lat === LAT);
        const lon = Longitude.findIndex((lon) => lon === LON);
        if (lat === -1 || lon === -1 || lat !== lon) {
            return -2;
        }
        beepers[findBeeper].latitude = LAT;
        beepers[findBeeper].longitude = LON;
        beepers[findBeeper].status = statuses[indexOfCurrentStatus + 1];
        yield writeListBeepersToJsonFile(beepers);
        changeStatusToDetonated(findBeeper);
        return beepers[findBeeper];
    }
    else {
        beepers[findBeeper].status = statuses[indexOfCurrentStatus + 1];
        yield writeListBeepersToJsonFile(beepers);
        return beepers[findBeeper];
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

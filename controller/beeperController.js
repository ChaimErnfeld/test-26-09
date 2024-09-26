var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addBeeper, getBeepers, getBeeper, getBeeperByStatuses, deletee, put, } from "../services/beeperService.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newBeeper = yield addBeeper(name);
        res.status(201).json({ "the new beeper": newBeeper });
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeepers();
        res.status(201).json({ beepers: beepers });
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const beeper = yield getBeeper(id);
        if (typeof beeper !== "number") {
            res.status(200).json(beeper);
        }
        else {
            res.status(400).json({ error: "beeper is not found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        const beepers = yield getBeeperByStatuses(status);
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const beepers = yield deletee(id);
        if (typeof beepers !== "number") {
            res.status(200).json({ massage: "beeper Deleted successfully" });
        }
        else {
            res.status(400).json({ error: "beeper is not found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});
export const putBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { LAT, LON } = req.body;
        const { id } = req.params;
        const beeper = yield put(id, LAT, LON);
        if (typeof beeper !== "number") {
            res.status(200).json(beeper);
        }
        else if (beeper === -1) {
            res.status(400).json({ massage: "The status cannot be changed" });
        }
        else if (beeper === -2) {
            res
                .status(400)
                .json({ massage: "lat or lon is not good or beeper is not found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "error" });
    }
});

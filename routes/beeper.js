import express from "express";
import { createBeeper, getAllBeepers, getBeeperById, deleteBeeper, putBeeper, } from "../controller/beeperController.js";
const router = express.Router();
router.route("/").post(createBeeper);
router.route("/").get(getAllBeepers);
router.route("/:id").get(getBeeperById);
router.route("/:id").delete(deleteBeeper);
router.route("/:id/status").put(putBeeper);
export default router;

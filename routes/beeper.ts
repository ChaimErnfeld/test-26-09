import express, { Router } from "express";
import {
  createBeeper,
  getAllBeepers,
  getBeeperById,
  getBeepersByStatus,
  deleteBeeper,
  putBeeper,
} from "../controller/beeperController.js";

const router: Router = express.Router();

router.route("/").post(createBeeper);
router.route("/").get(getAllBeepers);
router.route("/:id").get(getBeeperById);
router.route("/status/:status").get(getBeepersByStatus);
router.route("/:id").delete(deleteBeeper);
router.route("/:id/status").put(putBeeper);

export default router;

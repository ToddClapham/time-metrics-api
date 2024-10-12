import * as express from "express";
import timeController from "../controllers/time.controller";
const router = express.Router();

router.get('/time', timeController.getTimeInSeconds);

export default router;
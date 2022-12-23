import Express from "express";
import { createPlayer, getPlayers } from "../controllers/playerController";

const router = Express.Router();

router.post('/', createPlayer);

router.get('/', getPlayers);

export default router;
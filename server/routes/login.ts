import Express from "express";
import {loginView,loginUser, registerUser } from "../controllers/loginController";
import { protectRoute } from "../auth/protect";
import { dashboardView } from "../controllers/dashboardController";
import { getPlayer, patchPlayer } from "../controllers/dashboardController";

const router = Express.Router();

router.get('/', loginView);
router.post("/", loginUser);
router.get("/dashboard", protectRoute, dashboardView);
router.get('/dashboard/player/:playerId',protectRoute, getPlayer);
router.post('/dashboard/editPlayer/:playerId',protectRoute, patchPlayer);
router.post('/register', registerUser);

export default router;
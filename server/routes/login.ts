import Express from "express";
import {loginView,loginUser, registerUser } from "../controllers/loginController";
import { protectRoute } from "../../auth/protect";
import { dashboardView } from "../controllers/dashboardController";

const router = Express.Router();

router.get('/', loginView);
router.post("/", loginUser);
router.get("/dashboard", protectRoute, dashboardView);

router.post('/register', registerUser);

export default router;
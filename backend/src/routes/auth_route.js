import express from "express";
import { checkAuth } from "../controllers/auth_controller.js";
import { protectRoute } from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);

export default router;
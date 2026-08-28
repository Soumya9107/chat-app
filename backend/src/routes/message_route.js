import express from "express";
import { getUsersForSidebar, getConversationsForSidebar } from "../controllers/message_controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/conversations", protectRoute, getConversationsForSidebar);

export default router;
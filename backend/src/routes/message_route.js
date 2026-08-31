import express from "express";
import { getUsersForSidebar, getConversationsForSidebar } from "../controllers/message_controller.js";
import { protectRoute } from "../middleware/auth_middleware.js";
import { upload } from "../middleware/upload_middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/users", getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media") , sendMessage);

export default router;
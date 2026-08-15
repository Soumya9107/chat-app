import { getAuth } from "@clerk/express";
import User from "../models/user_model.js";

export async function protectRoute(req, res, next) { 
        try {
            const { userId } = getAuth(req);

            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const user = await User.findOne({ clerkId: userId });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            req.user = user;

            next();
    } catch (error) { 
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
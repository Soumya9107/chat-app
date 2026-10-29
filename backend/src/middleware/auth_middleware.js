import { clerkClient, getAuth } from "@clerk/express";
import User from "../models/user_model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);
            try {
                user = await User.findOneAndUpdate(
                    { clerkId: userId },
                    {
                        $setOnInsert: {
                            clerkId: userId,
                            email: clerkUser.emailAddresses[0]?.emailAddress,
                            fullName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                            profilePic: clerkUser.imageUrl,
                        },
                    },
                    { upsert: true, returnDocument: "after" }
                );
            } catch (err) {
                // another request created it first
                if (err.code === 11000) user = await User.findOne({ clerkId: userId });
                else throw err;
            }
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
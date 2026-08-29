import User from "../models/user_model.js";
import User from "../models/message_model.js";

export async function getUsersForSidebar(req, res) {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-clerkId");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getConversationsForSidebar(req, res) { 
    try {
        const loggedInUserId = req.user._id;

        const conversations = await Message.aggregate([
            { $match: { $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }] } },

            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderId", loggedInUserId] }, "$receiverId", "$senderId"]
                    },
                    lastMessageAt: { $max: "$createdAt" },
            },
        ]);
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error in getConversationsForSidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
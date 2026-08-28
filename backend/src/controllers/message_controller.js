import User from "../models/user_model.js";

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

    } catch (error) { 
        
    }
}
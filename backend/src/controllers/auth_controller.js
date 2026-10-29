export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
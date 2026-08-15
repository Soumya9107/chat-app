export async function checkAuth(req, res, next) { 
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    
    res.status(200).json({ message: "User is authenticated", user });
}
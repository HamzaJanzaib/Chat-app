const { verifyToken } = require("../Utils/Jwt");
const { UserModel } = require("../Config/Models/index");

module.exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ status: "failed", message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = verifyToken(token); // should return { id: ... }

        const user = await UserModel.findById(decoded.id).select("-password"); // exclude password
        if (!user) {
            return res.status(401).json({ status: "failed", message: "Unauthorized: User not found" });
        }

        req.user = user; // attach full user to request
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ status: "failed", message: "Unauthorized: Invalid token" });
    }
};

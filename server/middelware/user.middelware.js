import User from "../models/user.models.js";

// Middleware to check if user is authenticate

const requireAuth = async (req, res, next) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.json({
                success: false,
                message: "user is not authticated"
            })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user;
        next();
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default requireAuth;
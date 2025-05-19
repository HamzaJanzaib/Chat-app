import { verifyToken } from '../Utils/Index.js';
import User from './../Models/User.Model.js';

// Auth Middleware
export const proctedRoute = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }
    try {
        const decoded = await verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }
};

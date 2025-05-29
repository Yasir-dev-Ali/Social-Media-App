import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
    
        // Extract the token from the header
        const token = authHeader.split(' ')[1];
    
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        // Attach user to request object
        req.user = user;
        
        // Call next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}
export default authMiddleware;
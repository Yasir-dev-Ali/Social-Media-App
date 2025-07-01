const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Use decoded._id instead of decoded.id
        const user = await User.findById(decoded._id).select('-password');
        console.log('Authenticated user:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};
 export default authMiddleware;
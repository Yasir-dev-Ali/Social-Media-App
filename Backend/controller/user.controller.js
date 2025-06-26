import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { _id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // 1 day token
        );

        // Send back token and user (excluding password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
};


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.find({ email });
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
// Check password
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user[0]._id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // 1 day token
        );

        // Send back token and user (excluding password)
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
                password: user[0].password // You might want to exclude this in production
            },
            token
        });

    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Failed to log in user", error: error.message });
    }
}

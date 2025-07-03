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
            // { _id: newUser._id, email: newUser.email },
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


// export const LoginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.find({ email });
//         if (!user || user.length === 0) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
// // Check password
//         const isPasswordValid = await bcrypt.compare(password, user[0].password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }


//         // Generate JWT token
//         const token = jwt.sign(
//             { _id: user[0]._id, email: user[0].email },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" } // 1 day token
//         );

//         // Send back token and user (excluding password)
//         res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 _id: user[0]._id,
//                 name: user[0].name,
//                 email: user[0].email,
//                 password: user[0].password // You might want to exclude this in production
//             },
//             token
//         });

//     }
//     catch (error) {
//         console.error("Error logging in user:", error);
//         res.status(500).json({ message: "Failed to log in user", error: error.message });
//     }
// }


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            // { id: user._id, email: user.email },
            { id: user._id, email: user.email },

            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Failed to log in user", error: error.message });
    }
};

export const LogoutUser = async (req, res) => {
    try {
        // Invalidate the token on the client side by removing it from localStorage or cookies
        // This is a stateless logout, as JWTs are self-contained and do not require server-side invalidation
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Failed to log out user", error: error.message });
    }
}

export const GetUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user by middleware
        const user = await User.findById(userId).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
    }
};


export const UpdateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user by middleware
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password from response

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Failed to update user profile", error: error.message });
    }
};

export const DeleteUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user by middleware

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting user profile:", error);
        res.status(500).json({ message: "Failed to delete user profile", error: error.message });
    }
};

  

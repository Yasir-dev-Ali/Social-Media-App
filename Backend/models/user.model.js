import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://example.com/default-profile.png', // Default profile picture URL
    },
    bio: {
        type: String,
        default: '',
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
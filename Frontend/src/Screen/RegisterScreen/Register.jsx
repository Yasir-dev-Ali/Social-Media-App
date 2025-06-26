import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../../assets/google.png";
import image1 from "../../assets/facebook.svg";
import image2 from "../../assets/github.png";
const LoginScreen = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with Redux dispatch or API call
    };

    const handleSocialLogin = (platform) => {
        console.log(`Logging in with ${platform}`);
        // Implement actual OAuth logic
    };

    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Sign In to Socialify
                </h2>
                <form onSubmit={handleSubmit} className=" space-y-5">
                    <div>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <Button fullWidth variant="contained" type="submit">
                        Register
                    </Button>
                </form>


                {/* Social Auth */}

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-500 mb-3">Or sign in with</p>
                    <div className="flex justify-center gap-4">
                        {/* Google */}
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-[#DB4437] hover:bg-[#c23325] transition"
                        >
                            <img src={image} alt="Google" className="w-8 h-8" />
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={() => handleSocialLogin('facebook')}
                            className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#145dbf] transition"
                        >
                            <img src={image1} alt="Facebook" className="w-8 h-8" />
                        </button>

                        {/* GitHub */}
                        <button
                            onClick={() => handleSocialLogin('github')}
                            className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-[#000000] hover:bg-[#333] transition"
                        >
                            <img src={image2} alt="GitHub" className="w-8 h-8" />
                        </button>
                    </div>
                </div>


                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;

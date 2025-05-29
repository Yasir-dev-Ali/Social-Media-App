// src/Screens/Auth/LoginScreen.jsx
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with Redux dispatch or API call
    };

    return (
        <>
            <div className="flex justify-center items-center h-[100vh] bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                        Sign In to Socialify
                    </h2>
                    <form onSubmit={handleSubmit} className=" space-y-5">
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Sign In
                        </Button>
                    </form>
                    <p className="text-center mt-4">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
            
        </>
        



            
            
        
               
    );
};

export default LoginScreen;

// src/Screens/Auth/LoginScreen.jsx
import { TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate('/'); // or /dashboard
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    🔐 Sign In to Socialify
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                    />
                    {error && <p>{error.message || "Something went wrong"}</p>} 
                    {/* <p className="text-red-500 text-sm text-center">
                        {error ? error.message : ''} */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="!mt-4"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;

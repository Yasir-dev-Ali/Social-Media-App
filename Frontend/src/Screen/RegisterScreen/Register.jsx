import { TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthError } from '../../features/auth/authSlice';
import { message } from 'antd'; // ✅ using antd message

const RegisterScreen = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, error } = useSelector((state) => state.auth || {});

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            message.error('Please fill in all fields');
            return;
        }

        dispatch(clearAuthError());

        dispatch(registerUser(formData)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                message.success('Registration successful');
                navigate('/');
            }
        });
    };

    useEffect(() => {
        if (error) {
            message.error(error.message || 'Registration failed');
            dispatch(clearAuthError());
        }
    }, [error, dispatch]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Register to Socialify
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className="!bg-indigo-600 !text-white hover:!bg-indigo-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

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

export default RegisterScreen;

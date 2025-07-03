import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice'; // adjust path if needed

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch the logout thunk
        dispatch(logoutUser());

        // Optional delay (e.g., for toast), then navigate
        setTimeout(() => {
            navigate('/login');
        }, 100);
    }, [dispatch, navigate]);

    return null;
};

export default Logout;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from '../../app/axiosInstance';  
import { message } from 'antd';


// === Async Thunks ===
// export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
//     try {
//         const response = await API.post('/login', userData);

//         console.log("Login User Response:", response.data);
//         // localSotrage save it
//         localStorage.setItem('user', JSON.stringify({
//             token: res.data.token,
//             _id: res.data.user._id,
//             name: res.data.user.name
//           }));

//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });
// export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
//     try {
//         const response = await API.post('/user', userData);
//         console.log("Register User Response:", response.data);


//         if (!response.data || !response.data.user) {
//             throw new Error("User not found in response");
//         }
        
//         // Optionally, you can also log in the user after registration
//         // const loginResponse = await API.post('/auth/login', userData);
//         return response.data;
        
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// Register user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await API.post('/user', userData);
        console.log("Register User Response:", response.data);

        if (!response.data || !response.data.user) {
            throw new Error("User not found in response");
        }

        // ✅ Save token after successful registration
        localStorage.setItem('user', JSON.stringify({
            token: response.data.token,
            _id: response.data.user._id,
            name: response.data.user.name
        }));
        console.log("User registered successfully:", response.data);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});


// Login user

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await API.post('/login', userData);

        console.log("Login User Response:", response.data);

        // ✅ Correct localStorage saving
        localStorage.setItem('user', JSON.stringify({
            token: response.data.token,
            _id: response.data.user._id,
            name: response.data.user.name
        }));
        console.log("User logged in successfully:", response.data);

        return response.data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});





// Fetch user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get('/auth/profile');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update user profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (userData, { rejectWithValue }) => {
    try {
        const response = await API.put('/auth/profile', userData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Logout user
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        // Invalidate the token on the client side by removing it from localStorage
        localStorage.removeItem('user');
        return;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);




// === Slice ===

 const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                toast.success('Login successful');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload.message || 'Login failed');
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;

                message.open({
                    type: 'success',
                    content: 'Registration successful',
                    
                });
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                message.open({
                    type: 'error',
                    content: action.payload.message || 'Registration failed',
                });
            })
              
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.error = null;
                localStorage.removeItem('user'); // Clear user data from localStorage
                state.token = null; // Clear token from state
                toast.success('Logout successful');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload.message || 'Logout failed');
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload.message || 'Failed to fetch user profile');
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = { ...state.user, ...action.payload.user };
                toast.success('Profile updated successfully');
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload.message || 'Failed to update profile');
            }
        );
    }
 });

export default authSlice.reducer; // ✅ must export default
export const { clearAuthError } = authSlice.actions; // ✅ must export named actions
export const selectAuth = (state) => state.auth; // ✅ must export selector

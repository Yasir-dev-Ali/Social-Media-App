import { useState } from 'react';
import { Routes, Route } from 'react-router';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import PostScreen from './Screen/PostScreen/PostScreen';
import Header from './components/Header/Header';
import LoginScreen from './Screen/LoginScreen/Login';
import RegisterScreen from './Screen/RegisterScreen/Register';

function App() {
  return (
    <>
      <Header /> {/* ✅ Header goes outside Routes */}
      <main className="pt-20 px-4"> {/* Optional spacing for fixed Header */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/post" element={<PostScreen />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/register" element={ <RegisterScreen/>} />
          <Route path="/login" element={<LoginScreen />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;

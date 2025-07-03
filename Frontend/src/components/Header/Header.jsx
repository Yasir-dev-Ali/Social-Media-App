// src/components/Header.jsx
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// // import { useSelector } from 'react-redux';

// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     // const user = useSelector((state) => state.auth?.user);
//     const user = JSON.parse(localStorage.getItem('user')); // If not using Redux

//     const commonItems = [
//         { name: 'Home', path: '/' },
//         { name: 'Posts', path: '/Post' },
//         { name: 'About', path: '/about' },
//     ];

//     const authItems = user
//         ? [{ name: 'Logout', path: '/logout' }]
//         : [
//             { name: 'Register', path: '/register' },
//             { name: 'Login', path: '/login' },
//         ];

//     const navItems = [...commonItems, ...authItems];

//     return (
//         <header className="bg-white shadow-md w-full top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//                 {/* Logo */}
//                 <h1 className="text-2xl font-bold text-indigo-600">Socialify</h1>

//                 {/* Desktop Nav */}
//                 <nav className="hidden md:flex space-x-6 items-center">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.path}
//                             className="text-gray-600 hover:text-indigo-600 transition"
//                         >
//                             {item.name}
//                         </Link>
//                     ))}

//                     {user && (
//                         <span className="ml-4 text-sm text-gray-500">
//                             Hi, {user.name}
//                         </span>
//                     )}
//                 </nav>

//                 {/* Mobile Menu Icon */}
//                 <div className="md:hidden">
//                     <button onClick={() => setMenuOpen(!menuOpen)}>
//                         {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Dropdown */}
//             {menuOpen && (
//                 <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.path}
//                             className="block text-gray-600 hover:text-indigo-600 transition"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}

//                     {user && (
//                         <div className="text-sm text-gray-500 mt-2">
//                             Hi, {user.name}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;

import { useState } from 'react';
import { Menu, X, Sun, Moon, Settings, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    })();

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setDropdownOpen(false);
        navigate('/login');
    };

    const commonItems = [
        { name: 'Home', path: '/' },
        { name: 'Posts', path: '/Post' },
        { name: 'About', path: '/about' },
    ];

    const authItems = user
        ? []
        : [
            { name: 'Register', path: '/register' },
            { name: 'Login', path: '/login' },
        ];

    const navItems = [...commonItems, ...authItems];

    const userInitials =
        user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Socialify</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Theme Toggle */}
                    <ThemeToggle
                        theme={theme}
                        toggleTheme={toggleTheme}
                        className="ml-3"
                    />

                    {/* User Dropdown */}
                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase"
                            >
                                {userInitials}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <Settings size={16} className="mr-2" /> Settings
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <User size={16} className="mr-2" /> Update Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                                    >
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-4 py-3 space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <>
                            <Link
                                to="/settings"
                                className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                                onClick={() => setMenuOpen(false)}
                            >
                                Settings
                            </Link>
                            <Link
                                to="/profile"
                                className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                                onClick={() => setMenuOpen(false)}
                            >
                                Update Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block text-red-600 dark:text-red-400 hover:text-red-800"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* Theme toggle mobile */}
                    <button
                        onClick={toggleTheme}
                        className="block text-gray-500 hover:text-indigo-600 dark:text-gray-300"
                    >
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;



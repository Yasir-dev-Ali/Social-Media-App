// src/components/Header.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector((state) => state.auth?.user);

    const commonItems = [
        { name: 'Home', path: '/' },
        { name: 'Posts', path: '/Post' },
        { name: 'About', path: '/about' },
    ];

    const authItems = user
        ? [{ name: 'Logout', path: '/logout' }]
        : [
            { name: 'Register', path: '/register' },
            { name: 'Login', path: '/login' },
        ];

    const navItems = [...commonItems, ...authItems];

    return (
        <header className="bg-white shadow-md w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-indigo-600">Socialify</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-gray-600 hover:text-indigo-600 transition"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <span className="ml-4 text-sm text-gray-500">
                            Hi, {user.name}
                        </span>
                    )}
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="block text-gray-600 hover:text-indigo-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <div className="text-sm text-gray-500 mt-2">
                            Hi, {user.name}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;

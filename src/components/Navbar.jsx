import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import icon from '../assets/icon.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-transparent text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center mr-8">
                    <img src={icon} className="w-10 h-10 mr-2" alt="Logo" />
                    <span className="text-2xl font-bold">Forms</span>
                </Link>
            </div>
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition duration-300 shadow-md"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

// Navbar.jsx
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { io } from "socket.io-client";

// Establish a connection to the Socket.IO server.
// Adjust the URL if your server is hosted elsewhere.
const socket = io("http://localhost:9000");

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleNotifications = () => setShowNotifications(!showNotifications);

    // When the user logs in, register with the Socket.IO server using their email.
    useEffect(() => {
        if (user && user.email) {
            socket.emit("register", user.email);
        }
    }, [user]);

    // Listen for notifications from the server.
    useEffect(() => {
        socket.on("notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
        });
        // Cleanup listener on component unmount.
        return () => {
            socket.off("notification");
        };
    }, []);

    const isAdmin = user?.role === "admin";
    const isVerified = user?.isVerified;

    return (
        <nav className="bg-[#1E3A8A] text-white shadow-md px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between relative font-sans">
            {/* Logo Section */}
            <Link
                to="/"
                className="flex items-center gap-2 text-white hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
            >
                <img
                    className="h-16 w-auto"
                    src="https://i.ibb.co/Y9FjdL6/Crime-Watch.png"
                    alt="Logo"
                />
                <span className="font-bold text-[#FF8C00] text-xl">CrimeWatch</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center text-lg">
                <Link
                    to="/crime-feed"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    Crime Feed
                </Link>
                {isVerified && (
                    <Link
                        to="/report"
                        className="text-[#F3F4F6] hover:text-[#FF8C00] font-semibold hover:scale-105 hover:font-bold transition-all duration-300"
                    >
                        Report Crime
                    </Link>
                )}
                <Link
                    to="/my-reports"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    My Reports
                </Link>
                <Link
                    to="/community"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    Community
                </Link>
                <Link
                    to="/about-us"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    About
                </Link>
                <Link
                    to="/post-crime"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    Post Crime
                </Link>
                <Link
                    to="/chat-bot"
                    className="text-[#F3F4F6] hover:text-[#FF8C00] hover:scale-105 hover:font-bold transition-all duration-300"
                >
                    Trial-Ai
                </Link>
                {isAdmin && (
                    <Link
                        to="/admin"
                        className="text-[#DC2626] font-semibold hover:text-[#ff5f5f] hover:scale-105 hover:font-bold transition-all duration-300"
                    >
                        Admin Panel
                    </Link>
                )}

                {/* Notification Bell */}
                <div className="relative">
                    <button onClick={toggleNotifications} className="relative focus:outline-none">
                        <FaBell className="text-2xl text-white hover:text-[#FF8C00] transition-all duration-300" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-10">
                            <ul className="max-h-64 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 border-b last:border-0 hover:bg-gray-100"
                                        >
                                            {notif.message}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2">No new notifications</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
                <button
                    className="text-2xl focus:outline-none text-white hover:text-[#FF8C00] hover:scale-105 transition-all duration-300"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#1E3A8A] text-white shadow-md md:hidden z-10">
                    <ul className="flex flex-col items-center gap-4 py-4 text-lg">
                        <Link
                            to="/crime-feed"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            Crime Feed
                        </Link>
                        {isVerified && (
                            <Link
                                to="/report"
                                onClick={toggleMenu}
                                className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                            >
                                Report Crime
                            </Link>
                        )}
                        <Link
                            to="/my-reports"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            My Reports
                        </Link>
                        <Link
                            to="/community"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            Community
                        </Link>
                        <Link
                            to="/about-us"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            About
                        </Link>
                        <Link
                            to="/leaderboard"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            Leaderboard
                        </Link>
                        <Link
                            to="/chat-bot"
                            onClick={toggleMenu}
                            className="w-full text-center py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                        >
                            Trial-Ai
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={toggleMenu}
                                className="w-full text-center py-2 text-[#DC2626] font-semibold hover:text-[#ff5f5f] hover:scale-105 hover:font-bold transition-all duration-300"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </ul>
                </div>
            )}

            {/* Profile / Signup Section */}
            <div className="hidden md:flex items-center gap-4">
                {!user ? (
                    <Link
                        to="/registration"
                        className="bg-[#FF8C00] text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#FFA726] hover:scale-105 hover:font-bold transition-all duration-300"
                    >
                        Signup
                    </Link>
                ) : (
                    <div className="relative group">
                        <button className="flex items-center gap-2 focus:outline-none hover:scale-105 transition-all duration-300">
                            <img
                                className="w-10 h-10 rounded-full border-2 border-white"
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="Profile"
                                title={user?.displayName}
                            />
                        </button>
                        {/* Profile Dropdown Menu */}
                        <ul className="absolute right-0 mt-2 p-2 shadow-lg bg-[#F3F4F6] text-black rounded-md w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-[#FF8C00] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logOut}
                                    className="w-full text-left px-4 py-2 hover:bg-[#DC2626] hover:text-white hover:scale-105 hover:font-bold transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </li>
                            <li>
                                <Link
                                    to="/forget-password"
                                    className="block px-4 py-2 text-blue-500 hover:underline hover:scale-105 hover:font-bold transition-all duration-300"
                                >
                                    Forget Password?
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
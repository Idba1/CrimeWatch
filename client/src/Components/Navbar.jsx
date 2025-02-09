import { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isAdmin = user?.role === "admin";
    const isVerified = user?.isVerified;

    return (
        <nav className="bg-base-100 shadow-sm container px-4 mx-auto flex items-center justify-between py-2">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2">
                <img className="h-7 w-auto" src="./logo.jpg" alt="Logo" />
                <span className="font-bold text-xl">CrimeWatch</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
                <Link to="/crime-feed" className="hover:text-blue-600">Crime Feed</Link>
                {isVerified && (
                    <Link to="/report" className="hover:text-blue-600 font-semibold">Report Crime</Link>
                )}
                <Link to="/my-reports" className="hover:text-blue-600">My Reports</Link>
                <Link to="/community" className="hover:text-blue-600">Community</Link>
                <Link to="/about-us" className="hover:text-blue-600">About</Link>
                <Link to="/leaderboard" className="hover:text-blue-600">Leaderboard</Link>
                {isAdmin && <Link to="/admin" className="text-red-600 font-semibold">Admin Panel</Link>}
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex items-center">
                <button className="text-2xl focus:outline-none" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-base-100 shadow-md md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <Link to="/crime-feed" onClick={toggleMenu}>Crime Feed</Link>
                        {isVerified && <Link to="/report" onClick={toggleMenu}>Report Crime</Link>}
                        <Link to="/my-reports" onClick={toggleMenu}>My Reports</Link>
                        <Link to="/community" onClick={toggleMenu}>Community</Link>
                        <Link to="/about-us" onClick={toggleMenu}>About</Link>
                        <Link to="/leaderboard" onClick={toggleMenu}>Leaderboard</Link>
                        {isAdmin && <Link to="/admin" onClick={toggleMenu}>Admin Panel</Link>}
                    </ul>
                </div>
            )}

            {/* Profile or Login Section */}
            <div className="hidden md:flex items-center gap-4">
                {!user ? (
                    <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="avatar btn btn-ghost btn-circle flex items-center justify-center">
                            <img
                                className="w-10 rounded-full"
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="Profile"
                                title={user?.displayName}
                            />
                        </div>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={logOut} className="text-left">Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
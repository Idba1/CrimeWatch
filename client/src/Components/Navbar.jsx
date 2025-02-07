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

    return (
        <nav className="bg-base-100 shadow-sm container px-4 mx-auto flex items-center justify-between py-2">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2">
                <img className="h-7 w-auto" src="./logo.jpg" alt="Logo" />
                <span className="font-bold text-xl">RiseWithYou</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
                <Link to="/about-us" className="hover:text-blue-600">
                    About Us
                </Link>
                <Link to="/solutions" className="hover:text-blue-600">
                    Solutions
                </Link>
                <Link to="/services" className="hover:text-blue-600">
                    Services
                </Link>
                <Link to="/resources" className="hover:text-blue-600">
                    Resources
                </Link>
                <Link to="/success-stories" className="text-blue-600 font-semibold">
                    Success Stories
                </Link>
                <Link to="/partners" className="hover:text-blue-600">
                    Partners
                </Link>
                <Link
                    to="/contact-us"
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
                >
                    Contact Us
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex items-center">
                <button
                    className="text-2xl focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-base-100 shadow-md md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <Link to="/about-us" onClick={toggleMenu}>
                            About Us
                        </Link>
                        <Link to="/solutions" onClick={toggleMenu}>
                            Solutions
                        </Link>
                        <Link to="/services" onClick={toggleMenu}>
                            Services
                        </Link>
                        <Link to="/resources" onClick={toggleMenu}>
                            Resources
                        </Link>
                        <Link to="/success-stories" onClick={toggleMenu}>
                            Success Stories
                        </Link>
                        <Link to="/partners" onClick={toggleMenu}>
                            Partners
                        </Link>
                        <Link
                            to="/contact-us"
                            onClick={toggleMenu}
                            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
                        >
                            Contact Us
                        </Link>
                    </ul>
                </div>
            )}

            {/* Profile or Login Section */}
            <div className="hidden md:flex items-center gap-4">
                {!user ? (
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                    >
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="avatar btn btn-ghost btn-circle flex items-center justify-center"
                        >
                            <img
                                className="w-10 rounded-full"
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="Profile"
                                title={user?.displayName}
                            />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logOut} className="text-left">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
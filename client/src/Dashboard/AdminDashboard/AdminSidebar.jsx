import { FaTachometerAlt, FaUser, FaExclamationTriangle, FaComment, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-white shadow-md h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <nav className="mt-10">
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaTachometerAlt className="mr-3" />
                    Dashboard
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaUser className="mr-3" />
                    Users
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaExclamationTriangle className="mr-3" />
                    Reports
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaComment className="mr-3" />
                    Moderation
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaCog className="mr-3" />
                    Settings
                </a>
            </nav>
        </div>
    );
};

export default AdminSidebar;

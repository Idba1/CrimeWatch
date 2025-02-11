import { FaHome, FaClipboardList, FaUser } from 'react-icons/fa';

const VerifiedSidebar = () => {
    return (
        <div className="w-64 bg-white shadow-md h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold">Crime Verify</h2>
            </div>
            <nav className="mt-10">
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaHome className="mr-3" />
                    Dashboard
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaClipboardList className="mr-3" />
                    My Reports
                </a>
                <a href="#" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
                    <FaUser className="mr-3" />
                    Profile
                </a>
            </nav>
        </div>
    );
};

export default VerifiedSidebar;

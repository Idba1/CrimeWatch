import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
                {/* Profile Image */}
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
                />

                {/* User Info */}
                <div className="mt-4 space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">{user?.displayName || "User Name"}</h2>
                    <p className="text-sm text-gray-600">{user?.email || "user@example.com"}</p>
                    <span className="text-xs text-white bg-blue-500 px-3 py-1 rounded-full">
                        {user?.role || "General User"}
                    </span>
                </div>

                {/* Social Links (Optional) */}
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                        <i className="fas fa-envelope"></i>
                    </a>
                </div>

                {/* Edit Profile Button */}
                <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
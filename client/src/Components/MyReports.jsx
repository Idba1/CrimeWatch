import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const MyReports = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                if (!user || !user.email) {
                    setError("User not logged in");
                    setLoading(false);
                    return;
                }
                // Update the URL to your backend endpoint that filters by userEmail
                const response = await axios.get(`http://localhost:9000/crimePosts`, {
                    params: { userEmail: user.email }
                });
                // If the response returns an object with a "posts" property (for pagination), extract it.
                const data = response.data.posts ? response.data.posts : response.data;
                setReports(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load reports.");
                setLoading(false);
            }
        };

        fetchReports();
    }, [user]);

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">My Reports</h1>
            <p className="text-center text-gray-600 mb-6">View your published reports below.</p>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.slice(0, 9).map((report) => (
                        <div
                            key={report._id}
                            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800">
                                {report.title.charAt(0).toUpperCase() + report.title.slice(1)}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Report ID:</span> {report._id}
                            </p>
                            <p className="text-gray-600 mt-2">
                                {report.description.length > 100
                                    ? report.description.slice(0, 100) + "..."
                                    : report.description}
                            </p>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReports;
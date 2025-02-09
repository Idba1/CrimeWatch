import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Replace this with your actual API endpoint for leaderboard data
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Failed to load leaderboard.");
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Leaderboard</h1>
            <p className="text-center text-gray-600 mb-6">Check out the top contributors!</p>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white text-left">
                                <th className="px-4 py-2">Rank</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.slice(0, 10).map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                                        } hover:bg-blue-100 transition`}
                                >
                                    <td className="px-4 py-2 font-bold text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-2 text-gray-800">{user.name}</td>
                                    <td className="px-4 py-2 text-gray-600">{user.email}</td>
                                    <td className="px-4 py-2 text-gray-600">{user.address.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
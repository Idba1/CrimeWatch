import { useEffect, useState } from "react";
import axios from "axios";

const CrimeFeed = () => {
    const [crimeData, setCrimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrimeData = async () => {
            try {
                const response = await axios.get(
                    "https://data.police.uk/api/crimes-no-location?category=all-crime&force=leicestershire"
                );
                setCrimeData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load crime data.");
                setLoading(false);
                console.log(err);
            }
        };

        fetchCrimeData();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
                Crime Feed
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Explore the latest crime reports from the database.
            </p>
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
                    {crimeData.slice(0, 9).map((crime, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800">
                                {crime.category.replace("-", " ").toUpperCase()}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Date:</span>{" "}
                                {crime.month || "Unknown"}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Location:</span>{" "}
                                {crime.location || "Unavailable"}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Outcome:</span>{" "}
                                {crime.outcome_status
                                    ? crime.outcome_status.category
                                    : "Pending"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CrimeFeed;
import { useEffect, useState } from "react";
import axios from "axios";

const CrimeFeed = () => {
    // State for fetched crime posts and UI loading/error
    const [crimeData, setCrimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // States for filtering and searching
    const [search, setSearch] = useState("");
    const [filterDivision, setFilterDivision] = useState("");
    const [filterDistrict, setFilterDistrict] = useState("");
    const [filterVerification, setFilterVerification] = useState("");

    // State for sorting: options can be "date", "upvotes", or "verificationScore"
    const [sortBy, setSortBy] = useState("date");

    // States for pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch crime posts from the backend whenever filtering, sorting, searching, or pagination options change.
    useEffect(() => {
        const fetchCrimeData = async () => {
            try {
                setLoading(true);
                // Prepare query parameters
                const params = {
                    search, // keywords for title or description
                    division: filterDivision,
                    district: filterDistrict,
                    verification: filterVerification, // adjust name if needed
                    sortBy, // "date", "upvotes", or "verificationScore"
                    page,
                    limit,
                };

                const response = await axios.get("http://localhost:9000/crimePosts", { params });
                // Expecting response data format: { posts, totalPosts, currentPage, totalPages }
                setCrimeData(response.data.posts);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (err) {
                setError("Failed to load crime data.");
                setLoading(false);
                console.error(err);
            }
        };

        fetchCrimeData();
    }, [search, filterDivision, filterDistrict, filterVerification, sortBy, page, limit]);

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Crime Feed</h1>
            <p className="text-center text-gray-600 mb-6">
                Explore the latest crime reports from the database.
            </p>

            {/* Filtering, Sorting, and Searching Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by title or description"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset page on new search
                    }}
                    className="border rounded px-3 py-2 w-full md:w-1/3"
                />

                {/* Division Filter */}
                <select
                    value={filterDivision}
                    onChange={(e) => {
                        setFilterDivision(e.target.value);
                        setPage(1); // reset page on filter change
                    }}
                    className="border rounded px-3 py-2 w-full md:w-1/4"
                >
                    <option value="">All Divisions</option>
                    <option value="Noakhali">Noakhali</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Dhaka">Dhaka</option>
                </select>

                {/* District Filter */}
                <select
                    value={filterDistrict}
                    onChange={(e) => {
                        setFilterDistrict(e.target.value);
                        setPage(1); // reset page on filter change
                    }}
                    className="border rounded px-3 py-2 w-full md:w-1/4"
                >
                    <option value="">All Districts</option>
                    <option value="Noakhali">Noakhali</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Dhaka">Dhaka</option>
                </select>

                {/* Verification Score Filter */}
                <select
                    value={filterVerification}
                    onChange={(e) => {
                        setFilterVerification(e.target.value);
                        setPage(1); // reset page on filter change
                    }}
                    className="border rounded px-3 py-2 w-full md:w-1/4"
                >
                    <option value="">All Verification Scores</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>

                {/* Sorting Options */}
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1); // reset page on sorting change
                    }}
                    className="border rounded px-3 py-2 w-full md:w-1/4 mt-4 md:mt-0"
                >
                    <option value="date">Sort by Date</option>
                    <option value="upvotes">Sort by Upvotes</option>
                    <option value="verificationScore">Sort by Verification Score</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {crimeData.length > 0 ? (
                            crimeData.map((crime) => (
                                <div
                                    key={crime._id}
                                    className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
                                >
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {crime.title ||
                                            (crime.category &&
                                                crime.category.replace("-", " ").toUpperCase())}
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Date:</span>{" "}
                                        {crime.crimeTime
                                            ? new Date(crime.crimeTime).toLocaleDateString()
                                            : "Unknown"}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Location:</span>{" "}
                                        {crime.district || "Unavailable"}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Division:</span>{" "}
                                        {crime.division || "Unavailable"}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Verification Score:</span>{" "}
                                        {crime.verificationScore || "N/A"}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Upvotes:</span>{" "}
                                        {crime.upvotes || 0}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600 col-span-full">
                                No crime posts found.
                            </p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 space-x-4">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-orange-500 disabled:opacity-50"
                                disabled={page === 1}
                            >
                                Prev
                            </button>
                            <span className="text-gray-700">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-orange-500 disabled:opacity-50"
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CrimeFeed;
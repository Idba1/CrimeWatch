import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [crimeData, setCrimeData] = useState({ posts: [], totalPosts: 0, currentPage: 1, totalPages: 1 });
    const [search, setSearch] = useState('');
    const [district, setDistrict] = useState('');
    const [page, setPage] = useState(1);
    const [showEdit, setShowEdit] = useState(false);
    const [editForm, setEditForm] = useState({ displayName: '', photoURL: '', bio: '', contact: '' });

    // Fetch user data based on email from AuthContext
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:9000/users?email=${user.email}`)
                .then(res => {
                    setUserData(res.data);
                    setEditForm({
                        displayName: res.data.displayName || '',
                        photoURL: res.data.photoURL || '',
                        bio: res.data.bio || '',
                        contact: res.data.contact || ''
                    });
                })
                .catch(err => console.error('Error fetching user data:', err));
        }
    }, [user]);

    // Fetch crime posts with filters and pagination
    const fetchCrimePosts = () => {
        if (user?.email) {
            axios.get('http://localhost:9000/crimePosts', {
                params: {
                    userEmail: user.email,
                    search,
                    district,
                    page,
                    limit: 6
                }
            })
                .then(res => {
                    setCrimeData(res.data);
                })
                .catch(err => console.error('Error fetching crime posts:', err));
        }
    };

    useEffect(() => {
        fetchCrimePosts();
    }, [user, search, district, page]);

    if (!userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading user data...</p>
            </div>
        );
    }

    // Handle edit profile form submission
    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/users/${userData._id}`, editForm)
            .then(res => {
                alert('Profile updated successfully.');
                setUserData({ ...userData, ...editForm });
                setShowEdit(false);
            })
            .catch(err => console.error('Error updating profile:', err));
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex flex-col items-center">
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

                </div>
                <div className="mt-4 text-center">
                    {userData.bio && <p className="text-gray-700 mb-2">{userData.bio}</p>}
                    {userData.contact && <p className="text-gray-600 text-sm">{userData.contact}</p>}
                </div>
                <div className='flex flex-col lg:flex-row w-1/2 justify-center items-center mx-auto gap-4'>
                    <button
                        className="mt-6 p-2 lg:px-5 bg-blue-500 text-white  py-2 rounded-lg shadow-md hover:bg-blue-600 w-full lg:w-1/2"
                        onClick={() => setShowEdit(true)}
                    >
                        Edit Profile
                    </button>
                    {/* <Link className="mt-6 p-2 lg:px-5 bg-blue-500 text-white  py-2 rounded-lg shadow-md hover:bg-blue-600 w-full lg:w-1/2" to={'http://localhost:5173/post-crime'}>
                        Post A Crime
                    </Link> */}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEdit && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Display Name</label>
                                <input
                                    type="text"
                                    value={editForm.displayName}
                                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Profile Picture URL</label>
                                <input
                                    type="text"
                                    value={editForm.photoURL}
                                    onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Bio</label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700">Contact Info</label>
                                <input
                                    type="text"
                                    value={editForm.contact}
                                    onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEdit(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Crime Reports Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Crime Reports</h3>
                {/* Filter and Search Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or description"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 mb-2 sm:mb-0 sm:mr-4 w-full sm:w-1/2"
                    />
                    <select
                        value={district}
                        onChange={(e) => { setDistrict(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 w-full sm:w-1/4"
                    >
                        <option value="">All Districts</option>
                        {/* Change these options as needed */}
                        <option value="District 1">District 1</option>
                        <option value="District 2">District 2</option>
                        <option value="District 3">District 3</option>
                    </select>
                </div>

                {/* Crime Report Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crimeData.posts && crimeData.posts.length > 0 ? (
                        crimeData.posts.map(report => (
                            <div key={report._id} className="bg-gray-100 rounded-lg p-4 shadow">
                                <img
                                    src={report.images && report.images.length > 0 ? report.images[0] : "https://via.placeholder.com/150"}
                                    alt={report.title}
                                    className="w-full h-40 object-cover rounded mb-4"
                                />
                                <h4 className="text-lg font-bold text-gray-800 mb-1">{report.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    {report.description.substring(0, 100)}...
                                </p>
                                <p className="text-xs text-gray-500 mb-1">
                                    <strong>Date:</strong> {new Date(report.crimeTime).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>District:</strong> {report.district}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No crime reports found.</p>
                    )}
                </div>

                {/* Pagination Controls */}
                {crimeData.totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={() => setPage(page > 1 ? page - 1 : 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span className="text-gray-700">
                            Page {page} of {crimeData.totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page < crimeData.totalPages ? page + 1 : page)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={page === crimeData.totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
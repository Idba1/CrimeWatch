import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

function PostCrime() {
    const { user } = useContext(AuthContext);
    const [crimePosts, setCrimePosts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        division: '',
        district: '',
        images: '',
        video: '',
        crimeTime: '',
    });
    const [editingId, setEditingId] = useState(null);

    // Update the API_URL if your backend is hosted elsewhere
    const API_URL = 'http://localhost:9000';

    useEffect(() => {
        fetchCrimePosts();
    }, []);

    // Fetch all crime posts and extract the posts array from the returned object
    const fetchCrimePosts = async () => {
        try {
            const response = await fetch(`${API_URL}/crimePosts`);
            const data = await response.json();
            // Check if data.posts exists, else assume data is an array
            if (data.posts) {
                setCrimePosts(data.posts);
            } else {
                setCrimePosts(data);
            }
        } catch (error) {
            console.error('Error fetching crime posts:', error);
        }
    };

    // Update form data when an input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for create or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add user email to the payload if available
        const payload = {
            title: formData.title,
            description: formData.description,
            division: formData.division,
            district: formData.district,
            images: formData.images.split(',').map((url) => url.trim()),
            video: formData.video || null,
            crimeTime: formData.crimeTime,
            userEmail: user?.email, // ensure the user email is included
        };

        try {
            if (editingId) {
                // Update existing post
                const response = await fetch(`${API_URL}/crimePosts/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    setEditingId(null);
                    resetForm();
                    fetchCrimePosts();
                }
            } else {
                // Create new post
                const response = await fetch(`${API_URL}/crimePosts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    resetForm();
                    fetchCrimePosts();
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Reset the form to its initial state
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            division: '',
            district: '',
            images: '',
            video: '',
            crimeTime: '',
        });
    };

    // Populate the form with data for editing
    const handleEdit = (post) => {
        setEditingId(post._id);
        setFormData({
            title: post.title,
            description: post.description,
            division: post.division,
            district: post.district,
            images: post.images.join(', '),
            video: post.video || '',
            crimeTime: new Date(post.crimeTime).toISOString().slice(0, 16), // Format for datetime-local input
        });
    };

    // Delete a post
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/crimePosts/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCrimePosts();
            }
        } catch (error) {
            console.error('Error deleting crime post:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Crime Posts</h1>

            {/* Form for creating/updating a crime post */}
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
            >
                <h2 className="text-2xl mb-4">
                    {editingId ? 'Edit Crime Post' : 'Add Crime Post'}
                </h2>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="division"
                        >
                            Division
                        </label>
                        <input
                            type="text"
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="district"
                        >
                            District
                        </label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="images"
                    >
                        Images (comma separated URLs)
                    </label>
                    <input
                        type="text"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="video"
                    >
                        Video URL (optional)
                    </label>
                    <input
                        type="text"
                        name="video"
                        value={formData.video}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="crimeTime"
                    >
                        Crime Time
                    </label>
                    <input
                        type="datetime-local"
                        name="crimeTime"
                        value={formData.crimeTime}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {editingId ? 'Update Post' : 'Add Post'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                resetForm();
                            }}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* List of crime posts rendered as cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {crimePosts.map((post) => (
                    <div key={post._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-700 mb-2">{post.description}</p>
                        <p className="text-gray-600 mb-2"><strong>Division:</strong> {post.division}</p>
                        <p className="text-gray-600 mb-2"><strong>District:</strong> {post.district}</p>
                        <p className="text-gray-600 mb-2">
                            <strong>Post Time:</strong> {new Date(post.postTime).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Crime Time:</strong> {new Date(post.crimeTime).toLocaleString()}
                        </p>

                        <div className="mb-2">
                            <strong>Images:</strong>
                            <div className="flex space-x-2 mt-1">
                                {post.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`img-${idx}`} className="w-16 h-16 object-cover rounded" />
                                ))}
                            </div>
                        </div>

                        {post.video && (
                            <div className="mb-2">
                                <strong>Video:</strong>
                                <div>
                                    <video width="320" height="240" controls>
                                        <source src={post.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => handleEdit(post)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostCrime;

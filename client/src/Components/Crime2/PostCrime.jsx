import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

function PostCrime() {
    const { user } = useContext(AuthContext);
    const [crimePosts, setCrimePosts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        division: '',
        district: '',
        images: '', // will be set as comma-separated URLs after upload
        video: '',
        crimeTime: '',
    });
    const [editingId, setEditingId] = useState(null);
    // For handling file input (multiple files)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

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

    // Handle file selection from device
    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    // Function to upload images to imgbb and return an array of image URLs
    const uploadImages = async () => {
        const imagebbApiKey = '1c267c56d05ce0b3bb6f46cbfad1d59b'; // Replace with your imgbb API key
        const uploadedUrls = [];
        // Loop through each selected file and upload it
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const data = new FormData();
            data.append('image', file);
            data.append('key', imagebbApiKey);
            try {
                const response = await axios.post('https://api.imgbb.com/1/upload', data);
                if (response.data && response.data.data && response.data.data.url) {
                    uploadedUrls.push(response.data.data.url);
                }
            } catch (error) {
                console.error('Error uploading image to imgbb:', error);
            }
        }
        return uploadedUrls;
    };

    // Function to call Gemini API to generate description from image URLs
    const generateDescription = async (imageUrls) => {
        try {
            // Replace the URL below with the actual Gemini API endpoint.
            // The request body is assumed to contain an array of image URLs.
            const response = await axios.post(
                'https://gemini-api.example.com/generate-description',
                { imageUrls }
            );
            if (response.data && response.data.description) {
                return response.data.description;
            }
        } catch (error) {
            console.error('Error generating description from Gemini API:', error);
        }
        return '';
    };

    // Handler to upload images and generate description (only if no video provided)
    const handleUploadAndGenerate = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select image files from your device.');
            return;
        }
        setUploading(true);
        try {
            // Upload images to imgbb
            const urls = await uploadImages();
            // Update formData.images as comma-separated URLs
            setFormData((prev) => ({ ...prev, images: urls.join(', ') }));
            // If no video and description is empty, generate description using Gemini API
            if (!formData.video && (!formData.description || formData.description.trim() === '')) {
                const generated = await generateDescription(urls);
                setFormData((prev) => ({ ...prev, description: generated }));
            }
        } catch (error) {
            console.error('Error during upload and description generation:', error);
        }
        setUploading(false);
    };

    // Handle form submission for create or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload with images as array (splitting by comma)
        const payload = {
            title: formData.title,
            description: formData.description,
            division: formData.division,
            district: formData.district,
            images: formData.images.split(',').map((url) => url.trim()),
            video: formData.video || null,
            crimeTime: formData.crimeTime,
            userEmail: user?.email,
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
        setSelectedFiles([]);
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
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
                <h2 className="text-2xl mb-4">{editingId ? 'Edit Crime Post' : 'Add Crime Post'}</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                        For image posts, leave blank to auto-generate a description via Gemini API.
                        For video posts, please enter a description manually.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="division">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
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

                {/* File input for selecting images */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        Select Images
                    </label>
                    <input type="file" multiple onChange={handleFileChange} className="w-full" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="crimeTime">
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

                {/* Button to upload images and generate description if applicable */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleUploadAndGenerate}
                        disabled={uploading}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {uploading ? "Uploading & Generating..." : "Upload Images & Generate Description"}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                            <button onClick={() => handleEdit(post)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
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
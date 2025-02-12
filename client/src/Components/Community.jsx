import { useEffect, useState } from "react";
import axios from "axios";

const Community = () => {
  // State for crime posts and loading/errors
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to hold new comment data for each post
  // We use an object where keys are post IDs, and each value holds { text, attachment }
  const [commentData, setCommentData] = useState({});

  // Fetch posts from the crimePosts endpoint
  const fetchPosts = async () => {
    try {
      // Adjust the URL as needed. Expecting the response to have a "posts" field.
      const response = await axios.get("http://localhost:9000/crimePosts");
      // If your API returns the posts directly, you can use response.data
      setPosts(response.data.posts || response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handler for voting (upvote or downvote)
  const handleVote = async (postId, voteType) => {
    try {
      await axios.post(`http://localhost:9000/crimePosts/${postId}/vote`, { vote: voteType });
      fetchPosts();
    } catch (err) {
      console.error("Error voting on post:", err);
      setError("Voting failed.");
    }
  };

  // Update the commentData state for a given post
  const handleCommentChange = (postId, field, value) => {
    setCommentData((prevData) => ({
      ...prevData,
      [postId]: {
        ...prevData[postId],
        [field]: value,
      },
    }));
  };

  // Handler to add a new comment for a post
  const handleAddComment = async (postId) => {
    const data = commentData[postId];
    if (!data || !data.text || !data.attachment) {
      alert("Both comment text and an attachment URL are required.");
      return;
    }
    try {
      // In a real app, replace "test@example.com" with the authenticated user's email.
      await axios.post(`http://localhost:9000/crimePosts/${postId}/comments`, {
        comment: data.text,
        userEmail: "test@example.com",
        attachment: data.attachment,
      });
      // Clear the comment input fields for this post
      setCommentData((prevData) => ({
        ...prevData,
        [postId]: { text: "", attachment: "" },
      }));
      fetchPosts();
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading community posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Community Crime Posts</h1>
        <p className="text-center text-gray-400 mb-10">
          Engage with our community by upvoting, downvoting, and commenting on crime posts.
        </p>
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-2">{post.description}</p>
              {post.images && post.images.length > 0 && (
                <div className="mb-2">
                  {post.images.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt="Crime evidence"
                      className="w-full max-h-60 object-cover rounded mb-2"
                    />
                  ))}
                </div>
              )}
              <p className="mb-2">
                <strong>Score:</strong> {post.score}
              </p>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleVote(post._id, "upvote")}
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Upvote
                </button>
                <button
                  onClick={() => handleVote(post._id, "downvote")}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Downvote
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((c, idx) => (
                    <div key={idx} className="border-t pt-2">
                      <p>{c.comment}</p>
                      {c.attachment && (
                        <img
                          src={c.attachment}
                          alt="Proof"
                          className="w-32 h-32 object-cover mt-1"
                        />
                      )}
                      <p className="text-sm text-gray-500">By: {c.userEmail}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Add Comment with Proof</h3>
                <textarea
                  className="w-full border p-2 mb-2"
                  placeholder="Your comment"
                  value={commentData[post._id]?.text || ""}
                  onChange={(e) => handleCommentChange(post._id, "text", e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border p-2 mb-2"
                  placeholder="Attachment URL (image/video)"
                  value={commentData[post._id]?.attachment || ""}
                  onChange={(e) => handleCommentChange(post._id, "attachment", e.target.value)}
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
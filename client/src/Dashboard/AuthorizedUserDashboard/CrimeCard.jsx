const CrimeCard = ({ post }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{post.description}</p>
            <div className="text-xs text-gray-500 mb-2">
                <span className="mr-2">Division: {post.division}</span>
                <span className="mr-2">District: {post.district}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">
                <span className="mr-2">Reported: {new Date(post.postTime).toLocaleString()}</span>
                <span>Crime Time: {new Date(post.crimeTime).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-green-500 hover:underline">Upvote ({post.upvotes})</button>
                <button className="text-red-500 hover:underline">Downvote ({post.downvotes})</button>
                <button className="text-blue-500 hover:underline">Comment</button>
            </div>
        </div>
    );
};

export default CrimeCard;
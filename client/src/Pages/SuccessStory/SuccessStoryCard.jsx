const SuccessStoryCard = ({ story }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <img
                src={story.thumbnail}
                alt={story.title}
                className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{story.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{story.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Read More
            </button>
        </div>
    );
};

export default SuccessStoryCard;
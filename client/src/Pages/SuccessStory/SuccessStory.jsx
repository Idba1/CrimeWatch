import { useEffect, useState } from "react";
import SuccessStoryCard from "./SuccessStoryCard";

const SuccessStory = () => {
    const [stories, setStories] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        
        fetch("https://dummyjson.com/products?limit=6")
            .then((res) => res.json())
            .then((data) => setStories(data.products));
    }, []);

    const filteredStories = stories.filter((story) =>
        filter === "all" ? true : story.category === filter
    );

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-6">
                We Succeed Only When You Rise With Your Dream
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                Explore real success stories of institutions using our solutions.
            </p>

            {/* filter*/}
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("courses")}
                    className={`px-4 py-2 rounded-lg ${filter === "courses" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Courses
                </button>
                <button
                    onClick={() => setFilter("department")}
                    className={`px-4 py-2 rounded-lg ${filter === "department" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Department
                </button>
            </div>

            {/* Success Stories Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                    <SuccessStoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    );
};

export default SuccessStory;
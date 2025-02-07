const Chatbot = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-4">
            {/* Header */}
            <h1 className="text-2xl md:text-4xl font-bold mb-6">What can I help with?</h1>

            {/* Input Field */}
            <div className="w-full md:w-2/3 lg:w-1/2 flex items-center bg-gray-800 rounded-full shadow-md px-4 py-2">
                <input
                    type="text"
                    placeholder="Ask ChatGPT anything"
                    className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full p-2 ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l5.536 5.536m0 0L15.232 16.232m5.536-5.536H3"
                        />
                    </svg>
                </button>
            </div>

            {/* Features Section */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <FeatureButton text="Search" />
                <FeatureButton text="Reason" />
                <FeatureButton text="Create image" />
                <FeatureButton text="Analyze data" />
                <FeatureButton text="Summarize text" />
                <FeatureButton text="Analyze images" />
                <FeatureButton text="More" />
            </div>
        </div>
    );
};

const FeatureButton = ({ text }) => (
    <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full px-6 py-2 shadow-md transition">
        {text}
    </button>
);

export default Chatbot;

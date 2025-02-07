import { useState } from "react";

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

    const API_TOKEN = import.meta.env.VITE_HuggingFaceApi;

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        try {
            let tries = 0;
            let response, data;

            while (tries < 5) {
                response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ inputs: input }),
                });

                data = await response.json();
                console.log("API Response:", data);

                if (!data.error || !data.error.includes("Model is currently loading")) {
                    break;
                }

                console.log(`Model is loading... Retrying in 10 seconds (${tries + 1}/5)`);
                await new Promise((resolve) => setTimeout(resolve, 10000));
                tries++;
            }

            const botMessageText = data.length > 0 && data[0].generated_text
                ? data[0].generated_text
                : "Sorry, your request is not work CZ request pending for free api";

            const botMessage = { text: botMessageText, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Error connecting to AI. Try again later.", sender: "bot" },
            ]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };


    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">RiseWithYou Chatbot</h1>

            <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 p-4 rounded-lg shadow-lg overflow-y-auto h-80">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 rounded ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full md:w-2/3 lg:w-1/2 flex items-center bg-gray-800 rounded-full shadow-md px-4 py-2 mt-4">
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
                />
                <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-4 py-2 ml-2">
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
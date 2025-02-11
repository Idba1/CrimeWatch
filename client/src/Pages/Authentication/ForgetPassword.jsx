import { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/request-password-recovery", { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error in password recovery request:", error);
            if (error.response) {
                setMessage("Error: " + error.response.data.message);
            } else {
                setMessage("Error: " + error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Password Recovery</h2>
                <form onSubmit={handlePasswordRecovery}>
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                        Send Recovery Link
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
};

export default ForgetPassword;
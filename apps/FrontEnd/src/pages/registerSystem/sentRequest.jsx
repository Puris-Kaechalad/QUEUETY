import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import '../client/client.css';

export default function SentRequest() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false); // state for tracking sending process

    const handleSendResetEmail = async () => {
        setSending(true); // set to true when sending starts
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset link sent! Check your email.");
        } catch (error) {
            setMessage("Error sending reset email. Try again.");
        } finally {
            setSending(false); // set to false after sending is finished
        }
    };

    return (
        <div className="regis flex justify-center items-center min-h-screen p-8 sm:p-0">
            <div className="regis-box p-8 rounded-lg shadow-lg w-full max-w-md shadow-black shadow-lg">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-4 tracking-wider">Reset Password</h2>
                <p className="block text-sm text-center text-white tracking-wider">
                    Enter your email to receive a reset link
                </p>
                <div className="mt-8 tracking-wider">
                    <label className="block text-sm font-medium text-white">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mt-8 w-full tracking-wider">
                    <button
                        onClick={handleSendResetEmail}
                        className="cursor-pointer w-full bg-yellow-600 text-white text-xl font-semibold py-2 border-1 border-transparent rounded-lg hover:bg-transparent hover:border-yellow-600 transition-all duration-200"
                        disabled={sending} // disable button during sending process
                    >
                        {sending ? "Sending..." : "SEND LINK"}
                    </button>
                </div>
                {message && <p className="text-center text-green-500 mt-4">{message}</p>}
                {message.includes("Error") && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleSendResetEmail}
                            className="text-blue-500 text-sm"
                        >
                            Send Again
                        </button>
                    </div>
                )}
                <div className="flex justify-center mt-4 text-lg tracking-wider">
                    <Link to="/login" className="text-white text-md hover:text-gray-400 duration-200">Back</Link>
                </div>
            </div>
        </div>
    );
}

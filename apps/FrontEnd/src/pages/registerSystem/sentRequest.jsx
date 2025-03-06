import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

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
        <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-black mb-4 tracking-wider">Reset Password</h2>
                <p className="block text-sm text-center text-gray-500 tracking-wider">
                    Enter your email to receive a reset link
                </p>
                <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mt-8 w-full">
                    <button
                        onClick={handleSendResetEmail}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        disabled={sending} // disable button during sending process
                    >
                        {sending ? "Sending..." : "SEND RESET LINK"}
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
                <div className="flex justify-center mt-4">
                    <Link to="/login" className="text-gray-500 text-md">Back</Link>
                </div>
            </div>
        </div>
    );
}

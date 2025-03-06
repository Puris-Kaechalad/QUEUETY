import React, { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPass() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // ดึง oobCode (รหัสยืนยันจาก Firebase)
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        const auth = getAuth();
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage("Password reset successful! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("Error resetting password. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-black mb-4 tracking-wider">Create New Password</h2>
                <div className="grid grid-rows-2 gap-4 mt-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Create new password..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            CONFIRM
                        </button>
                    </div>
                    {message && <p className="text-center text-green-500 mt-4">{message}</p>}
                    <div className="flex justify-center mt-4">
                        <button onClick={() => navigate("/login")} className="text-gray-500 text-md">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

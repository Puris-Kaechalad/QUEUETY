import React, { useEffect, useState } from 'react';
import Navbar from '../../component/nav';
import { ref, get } from 'firebase/database';
import { dbRealtime } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import './client.css';

function Profile() {
    const [userData, setUserData] = useState(null);
    const auth = getAuth();

    // เมื่อ component ถูกโหลดขึ้น ให้ดึงข้อมูลผู้ใช้
    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const userRef = ref(dbRealtime, `users/${user.uid}`); // ดึงข้อมูลจาก path `users/${user.uid}`

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val()); // ตั้งค่า userData เป็นข้อมูลที่ดึงมา
                } else {
                    console.log("No user data found");
                }
            }).catch((error) => {
                console.log("Error getting user data:", error);
            });
        }
    }, [auth]);

    return (
        <>
            <Navbar />
            <div className="profile h-screen flex justify-center items-center">
                <div className="profile-box w-1/3 space-y-10 p-8 rounded-lg shadow-black shadow-xl">
                    <h2 className="text-3xl text-yellow-400 font-bold tracking-widest">Your Information</h2>
                    <div className="space-y-6">
                        {userData ? (
                            <>
                                <div className="flex justify-center gap-4 text-black text-md tracking-wider">
                                    <p className="w-1/2 bg-white px-4 py-2 rounded-md">{userData.firstname}</p>
                                    <p className="w-1/2 bg-white px-4 py-2 rounded-md">{userData.lastname}</p>
                                </div>
                                <p className="w-full bg-white px-4 py-2 text-black text-md tracking-wider rounded-md">{userData.email}</p>
                                <div className="flex justify-center gap-4 text-black text-md tracking-wider">
                                    <p className="w-1/2 bg-white px-4 py-2 rounded-md">{userData.phone}</p>
                                    <p className="w-1/2 bg-white px-4 py-2 rounded-md">{userData.dob}</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";  // ใช้ dbRealtime แทน dbFirestore
import Navbar from '../../component/nav';
import './admin.css';

function UserInfo() {
    const [users, setUsers] = useState([]); // state สำหรับเก็บข้อมูลผู้ใช้

    // ฟังก์ชันดึงข้อมูลผู้ใช้จาก Firebase
    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = ref(dbRealtime, 'users'); // ดึงข้อมูลผู้ใช้จาก path 'users'
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const userArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setUsers(userArray); // เก็บข้อมูลผู้ใช้ใน state
            } else {
                console.log("No users data available");
            }
        };

        fetchUsers();
    }, []); // เรียกใช้เมื่อคอมโพเนนต์โหลด

    return (
        <>
            <Navbar />
            <div className="user px-auto py-16 flex justify-center items-center">
                <div className="user-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        User
                    </h2>
                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold">
                                    <th>No.</th> {/* เพิ่มคอลัมน์ที่แสดงลำดับ */}
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Date of birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user.id} className="text-lg text-end">
                                            <th>{index + 1}</th> {/* แสดงหมายเลขตามลำดับ */}
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.dob}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserInfo;

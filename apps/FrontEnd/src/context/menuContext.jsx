import React, { createContext, useState, useEffect } from "react";
import { ref, get, set, push, remove } from "firebase/database";
import { dbRealtime } from "../firebaseConfig"; // เชื่อมกับ Firebase

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState({
        Meat: {},  // ใช้ Object แทน Array
        Fries: {},
        SeaFood: {},
        Fruit: {},
        Dessert: {},
        Drink: {},
    });

    // ดึงข้อมูลเมนูจาก Firebase
    const fetchMenus = async () => {
        const menuRef = ref(dbRealtime, 'menuCategories');
        const snapshot = await get(menuRef);
        if (snapshot.exists()) {
            setMenus(snapshot.val()); // เซ็ตข้อมูลที่ได้รับจาก Firebase
        } else {
            console.log("No menus found");
        }
    };

    useEffect(() => {
        fetchMenus(); // เรียก fetchMenus เมื่อเริ่มต้น
    }, []);

    // ฟังก์ชันเพิ่มเมนู
    const addMenu = (category, name, imageUrl) => {
        const newMenu = { name, imageUrl };
        const categoryRef = ref(dbRealtime, `menuCategories/${category}`);
        
        // เพิ่มเมนูใหม่ใน Firebase
        push(categoryRef, newMenu);

        // อัปเดต state
        setMenus((prev) => ({
            ...prev,
            [category]: { ...prev[category], [newMenu.name]: newMenu }, // อัปเดตเมนูใน category
        }));
    };
    const deleteMenu = async (category, id) => {
        const menuRef = ref(dbRealtime, `menuCategories/${category}/${id}`); // ใช้ ID เพื่อทำการลบเมนู
        
        try {
            await remove(menuRef); // ลบเมนูจาก Firebase

            // อัปเดต state ให้ลบเมนูจาก categories
            setMenus((prevMenus) => {
                const updatedCategory = { ...prevMenus[category] };
                delete updatedCategory[id];  // ลบเมนูจาก state โดยใช้ ID
                return { ...prevMenus, [category]: updatedCategory };
            });

            console.log(`Menu with ID "${id}" deleted successfully from ${category}`);
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };


    return (
        <MenuContext.Provider value={{ menus, addMenu ,deleteMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

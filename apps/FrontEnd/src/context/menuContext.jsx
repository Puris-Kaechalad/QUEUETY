import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState({
        Meat: [],
        Fries: [],
        SeaFood: [],
        Fruit: [],
        Dessert: [],
        Drink: [],
    });

    const addMenu = (category, name, image) => {
        setMenus((prev) => ({
            ...prev,
            [category]: [...prev[category], { name, image }],
        }));
    };

    const deleteMenu = (category, name) => {
        setMenus((prev) => ({
            ...prev,
            [category]: prev[category].filter((item) => item.name !== name),
        }));
    };

    return (
        <MenuContext.Provider value={{ menus, addMenu, deleteMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

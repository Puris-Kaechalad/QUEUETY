import React from 'react'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import '../pages/client/client.css'
import { MenuContext } from "../context/menuContext";
import Menu from "../assets/menu-icon.png"
import All from "../assets/all.png"
import Meat from "../assets/meat.png"
import Fried from "../assets/fried.png"
import Shrimp from "../assets/shrimp.png"
import Apple from "../assets/apple.png"
import Dessert from "../assets/dessert.png"
import Drink from "../assets/drink.png"
import Edit from "../assets/pencil.png";
import Del from "../assets/bin.png";

function foodMenu() {
    const [category, setCategory] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuImage, setMenuImage] = useState(null);
    const [deleteName, setDeleteName] = useState("");
    const { addMenu, deleteMenu } = useContext(MenuContext);

    return (
        <>
            <aside className="sidebar w-1/4">
                <div className="h-screen grid grid-rows-1 p-8 tracking-widest">
                    <div className="flex gap-2 items-center self-center justify-self-center">
                        <img src={Menu} alt="icon" className="h-12" />
                        <h2 className="text-4xl text-yellow-500 font-bold">Menu</h2>
                    </div>

                    {/* edit, delete menu */}
                    <div className="flex justify-between">
                        <button className="bg-white text-sky-500 font-semibold px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => document.getElementById('addMenu').showModal()}>
                            Add
                            <img src={Edit} alt="edit icon" className="h-4" />
                        </button>

                        <button className="bg-white text-red-500 font-semibold px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => document.getElementById('deleteMenu').showModal()}>
                            Delete
                            <img src={Del} alt="edit icon" className="h-4" />
                        </button>
                    </div>

                    <dialog id="addMenu" className="modal">
                        <div className="modal-box bg-white text-black">
                            <form method="dialog">
                                <button className="btn bg-transparent border-none shadow-none absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <h3 className="font-bold text-2xl">Add menu</h3>
                            <div className="mt-8 text-center space-y-6">
                                <div>
                                    <details className="dropdown">
                                        <summary className="btn bg-transparent shadow-none text-black">Category</summary>
                                        <ul className="menu dropdown-content bg-white shadow-black shadow-lg rounded-box z-1 w-52 p-2 mt-1 shadow-sm">
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Meat")}
                                                    />
                                                    <span>Meat</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Fries")}
                                                    />
                                                    <span>Fries</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("SeaFood")}
                                                    />
                                                    <span>Sea food</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Fruit")}
                                                    />
                                                    <span>Fruit</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Dessert")}
                                                    />
                                                    <span>Dessert</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Drink")}
                                                    />
                                                    <span>Drink</span>
                                                </label>
                                            </li>

                                        </ul>
                                    </details>
                                </div>

                                <label className="text-lg">Name</label>
                                <div className="flex justify-center mt-2">
                                    <input
                                        type="text"
                                        value={menuName}
                                        onChange={(e) => setMenuName(e.target.value)}
                                        placeholder="stake"
                                        className="w-1/4"
                                    />
                                </div>

                                <label className="text-lg">Picture</label>
                                <div className="flex justify-center mt-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setMenuImage(e.target.files[0])}
                                        className="w-1/3"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-8">
                                <button
                                    className="bg-sky-500 px-4 py-1 text-white rounded-full hover:scale-110 duration-200 cursor-pointer"
                                    onClick={() => {
                                        if (category && menuName && menuImage) {
                                            addMenu(category, menuName, URL.createObjectURL(menuImage));
                                            setMenuName("");
                                            setMenuImage(null);
                                            document.getElementById("addMenu").close();
                                        } else {
                                            alert("กรุณากรอกข้อมูลให้ครบ");
                                        }
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </dialog>

                    <dialog id="deleteMenu" className="modal">
                        <div className="modal-box bg-white text-black">
                            <form method="dialog">
                                <button className="btn bg-transparent border-none shadow-none absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <h3 className="font-bold text-2xl">Delete menu</h3>
                            <div className="mt-8 text-center space-y-6">
                                <div>
                                    <details className="dropdown">
                                        <summary className="btn bg-transparent shadow-none text-black">Category</summary>
                                        <ul className="menu dropdown-content bg-white shadow-black shadow-lg rounded-box z-1 w-52 p-2 mt-1 shadow-sm">
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Meat")}
                                                    />
                                                    <span>Meat</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Fries")}
                                                    />
                                                    <span>Fries</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("SeaFood")}
                                                    />
                                                    <span>Sea food</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Fruit")}
                                                    />
                                                    <span>Fruit</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Dessert")}
                                                    />
                                                    <span>Dessert</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2 cursor-pointer px-2 py-1">
                                                    <input
                                                        type="radio"
                                                        name="radio-2"
                                                        className="radio radio-sm"
                                                        onChange={() => setCategory("Drink")}
                                                    />
                                                    <span>Drink</span>
                                                </label>
                                            </li>

                                        </ul>
                                    </details>
                                </div>

                                <label className="text-lg">Name</label>
                                <div className="flex justify-center mt-2">
                                    <input
                                        type="text"
                                        value={deleteName}
                                        onChange={(e) => setDeleteName(e.target.value)}
                                        placeholder="stake"
                                        className="w-1/4"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    className="bg-red-500 px-4 py-1 text-white rounded-full hover:scale-110 duration-200 cursor-pointer"
                                    onClick={() => {
                                        if (category && deleteName) {
                                            deleteMenu(category, deleteName);
                                            setDeleteName("");
                                            document.getElementById("deleteMenu").close();
                                        } else {
                                            alert("เลือกประเภทและชื่อเมนูก่อนลบนะ!");
                                        }
                                    }}
                                >
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </dialog>


                    {/* -------------------- */}

                    <div className="text-lg w-full self-start mt-4">
                        <Link to="/menu" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={All} alt="icon" className="h-6" />
                            <p>All</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/Meat" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Meat} alt="icon" className="h-6" />
                            <p>Meat</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/fries" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Fried} alt="icon" className="h-6" />
                            <p>Fries</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/seaFood" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Shrimp} alt="icon" className="h-6" />
                            <p>Sea food</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/fruit" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Apple} alt="icon" className="h-6" />
                            <p>Fruit</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/dessert" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105" onClick={() => handleCategoryClick('Dessert')}>
                            <img src={Dessert} alt="icon" className="h-6" />
                            <p>Dessert</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/drink" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105" onClick={() => handleCategoryClick('Drink')}>
                            <img src={Drink} alt="icon" className="h-6" />
                            <p>Drink</p>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default foodMenu
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/registerSystem/register'
import Login from './pages/registerSystem/login'
import SentRequest from './pages/registerSystem/sentRequest'
import Home from './pages/client/home.jsx'
import Reservation from './pages/client/reservation.jsx'
import Confirm from './pages/client/confirm_info.jsx'
import Finished from './pages/client/finished.jsx'
import History from './pages/client/history.jsx'
import Profile from './pages/client/profile.jsx'
import Admin from './pages/roleSystem/Admin'
import Staff from './pages/roleSystem/Staff'
import Promo from './pages/roleSystem/Promo'

// menu
import Menu from './pages/client/Menu/menu.jsx'
import Meat from './pages/client/Menu/meat.jsx';
import Fries from './pages/client/Menu/fries.jsx'
import SeaFood from './pages/client/Menu/seaFood.jsx'
import Fruit from './pages/client/Menu/fruit.jsx'
import Dessert from './pages/client/Menu/dessert.jsx'
import Drink from './pages/client/Menu/drink.jsx'
// end menu

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/finished" element={<Finished />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sentRequest" element={<SentRequest />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/Promo" element={<Promo />} />

        {/* menu */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/Meat" element={<Meat />} />
        <Route path="/menu/fries" element={<Fries />} />
        <Route path="/menu/seaFood" element={<SeaFood />} />
        <Route path="/menu/fruit" element={<Fruit />} />
        <Route path="/menu/dessert" element={<Dessert />} />
        <Route path="/menu/drink" element={<Drink />} />
        {/* end menu */}

      </Routes>
    </>
  )
}

export default App

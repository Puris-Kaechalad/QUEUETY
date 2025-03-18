import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/registerSystem/register'
import Login from './pages/registerSystem/login'
import SentRequest from './pages/registerSystem/sentRequest'
import Home from './pages/client/home.jsx'
import Menu from './pages/client/menu.jsx'
import Reservation from './pages/client/reservation.jsx'
import Confirm from './pages/client/confirm_info.jsx'
import Finished from './pages/client/finished.jsx'
import History from './pages/client/history.jsx'
import Profile from './pages/client/profile.jsx'
import Admin from './pages/roleSystem/Admin'
import Staff from './pages/roleSystem/Staff'
import Promo from './pages/roleSystem/Promo'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
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
      </Routes>
    </>
  )
}

export default App

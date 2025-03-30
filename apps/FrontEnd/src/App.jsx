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
import UserInfo from './pages/admin/userInfo.jsx'
import ReserveHistory from './pages/admin/reserveHistory.jsx'

// menu
import MenuLayout from './pages/client/Menu/menuLayout.jsx'
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
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/reserveHistory" element={<ReserveHistory />} />

        {/* menu */}
        <Route path="/menu" element={<MenuLayout />}>
          <Route index element={<Menu />} />
          <Route path="Meat" element={<Meat />} />
          <Route path="fries" element={<Fries />} />
          <Route path="seaFood" element={<SeaFood />} />
          <Route path="fruit" element={<Fruit />} />
          <Route path="dessert" element={<Dessert />} />
          <Route path="drink" element={<Drink />} />
        </Route>
        {/* end menu */}

      </Routes>
    </>
  )
}

export default App

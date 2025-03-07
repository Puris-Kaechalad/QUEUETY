import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/registerSystem/register'
import Login from './pages/registerSystem/login'
import SentRequest from './pages/registerSystem/sentRequest'
import SentOTP from './pages/registerSystem/sentOTP'
import ResetPassword from './pages/registerSystem/resetPass'
import Home from './pages/client/home'
import Admin from './pages/roleSystem/Admin'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sentRequest" element={<SentRequest />} />
        <Route path="/sentOTP" element={<SentOTP />} />
        <Route path="/resetPass" element={<ResetPassword />} />
        <Route path="/Admin" element={<Admin />} />

      </Routes>
    </>
  )
}

export default App

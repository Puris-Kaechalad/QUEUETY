import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/client/register'
import Login from './pages/client/login'
import SentRequest from './pages/client/sentRequest'
import SentOTP from './pages/client/sentOTP'
import ResetPassword from './pages/client/resetPass'
import Home from './pages/client/home'

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
      </Routes>
    </>
  )
}

export default App

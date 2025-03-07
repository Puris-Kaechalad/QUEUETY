import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/registerSystem/register'
import Login from './pages/registerSystem/login'
import SentRequest from './pages/registerSystem/sentRequest'
import ResetPassword from './pages/registerSystem/resetPass'
import Home from './pages/client/home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sentRequest" element={<SentRequest />} />
        <Route path="/resetPass" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/nav'

function App() {
  return (
    <>
      <Navbar/>
      <h1 class="text-red-500 font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App

import React from 'react'
import Navbar from '../component/nav'
import Cocktail from '../assets/cocktail.jpg'

function home() {
  return (
    <>
        <Navbar/>
        <div className="w-full h-150 z-10 top-0 left-0">
          <img src={Cocktail} alt="Background" className="w-full h-full object-cover" />
        </div>
      <div>

      </div>
    </>
  )
}

export default home
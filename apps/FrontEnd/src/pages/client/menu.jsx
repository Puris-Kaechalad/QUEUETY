import React from 'react'
import Navbar from '../../component/nav'
import './client.css'

function menu() {
    return (
        <>
            <Navbar />
            <div className="flex">
                <div className="sidebar w-1/5">
                    <p>sd</p>
                </div>
                <div className="content w-4/5">
                    <p>sdf</p>
                </div>
            </div>
        </>
    )
}

export default menu
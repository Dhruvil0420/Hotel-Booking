import React from 'react'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'
import { UserButton } from "@clerk/clerk-react"

function Navbar() {
    return (
        <div className='flex items-center justify-between bg-white transition-all border-b border-gray-300 px-4 py-3 md:px-8'>
            <Link to="/" >
                <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/>
            </Link>
            <UserButton />
        </div>
    )
}

export default Navbar;

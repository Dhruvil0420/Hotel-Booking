import React from 'react'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar () {

    const sidebarLinks = [
        {name:"Dashboard", path: "/owner", icon: assets.dashboardIcon},
        {name:"Add Room", path: "/owner/add-room", icon: assets.addIcon},
        {name:"List Room", path: "/owner/list-room", icon: assets.listIcon}
    ]
  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 flex flex-col transition-all pt-4 duration-300'>
      {sidebarLinks.map((item,index) => (
        <NavLink key={index} to={item.path} end='/owner'className={({isActive}) => `flex items-center gap-3 px-4 py-3 md:px-8 ${isActive ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600" : "text-gray-700 hover:bg-gray-100/90 border-white"}`}>
            <img src={item.icon} alt=""  className='min-w-6 min-h-6'/>
            <p className='text-center md:block hidden'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar;

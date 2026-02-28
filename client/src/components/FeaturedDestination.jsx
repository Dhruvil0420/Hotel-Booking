import React from 'react'
import { assets, roomsDummyData } from '../assets/assets';
import Hotelcard from './Hotelcard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

function FeaturedDestination () {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 '>

        <Title title='Featured Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'/>
      <div className='flex flex-wrap justify-center gap-3 mt-20 w-full'>
        {roomsDummyData.slice(0,4).map((room,index) => (
            <Hotelcard key={index} room={room} index={index}/>
        ))}
      </div>

      <button className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded cursor-pointer transition-all hover:bg-gray-50 bg-white' onClick={() => navigate("/rooms")}>View All Hotels</button>
    </div>
  )
}

export default FeaturedDestination;

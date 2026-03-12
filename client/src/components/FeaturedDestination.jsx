import Hotelcard from './Hotelcard';
import Title from './Title';
import { useContext } from 'react';
import { Appcontext } from '../context/AppContext';

function FeaturedDestination() {

  const { rooms, navigate } = useContext(Appcontext);

  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 '>

      <Title title='Featured Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences' />
      <div className='flex flex-wrap justify-center gap-3 mt-20 w-full'>
        {rooms.slice(0, 4).map((room, index) => (
          <Hotelcard key={index} room={room} index={index} />
        ))}
      </div>

      <button className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded cursor-pointer transition-all hover:bg-gray-50 bg-white' onClick={() => navigate("/rooms")}>View All Hotels</button>
    </div>
  )
}

export default FeaturedDestination;

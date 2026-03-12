import { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../context/AppContext';
import Title from './Title';
import Hotelcard from './Hotelcard';

function RecommendedHotels() {
    const { rooms, searchedcities } = useContext(Appcontext);
    const [recommended,setRecommended] = useState([]);

    const filterHotel = () => {
        const filterHotels = rooms.slice().filter(room => searchedcities.includes(room.hotel.city));
        setRecommended(filterHotels);
    }

    useEffect(() => {
        filterHotel();
    },[searchedcities,rooms]);

    return rooms.length > 0 && (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 '>

            <Title title='Recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences' />
            <div className='flex flex-wrap justify-center gap-3 mt-20 w-full'>
                {recommended.slice(0, 4).map((room, index) => (
                    <Hotelcard key={index} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedHotels;

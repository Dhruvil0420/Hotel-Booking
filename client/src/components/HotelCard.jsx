import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

function Hotelcard({ room, index }) {
    return (
        <Link
            to={"/rooms/" + room._id}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className='relative max-w-72 overflow-hidden bg-white text-gray-500/90 w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
        >

            {/* Image */}
            <img
                src={room.images[0]}
                alt=""
                className='w-full h-44 object-cover'
            />

            {/* Badge */}
            {index % 2 === 0 && (
                <p className='absolute top-3 left-3 px-3 py-1 bg-white text-gray-800 text-xs rounded-full shadow-sm'>
                    Best Seller
                </p>
            )}

            {/* Content */}
            <div className='p-5'>

                {/* Title + Rating */}
                <div className='flex items-center justify-between mb-2'>
                    <p className='font-playfair text-lg font-semibold text-gray-800'>
                        {room.hotel.name}
                    </p>

                    <div className='flex items-center gap-1 text-sm'>
                        <img src={assets.starIconFilled} alt="star-icon" className='w-4 h-4' />
                        4.5
                    </div>
                </div>

                {/* Location */}
                <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                    <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                    <span className='truncate'>{room.hotel.address}</span>
                </div>

                {/* Price + Button */}
                <div className='flex items-center justify-between mt-3'>
                    <p className='text-gray-800 font-medium'>
                        <span className='text-xl'>${room.pricePerNight}</span>
                        <span className='text-sm text-gray-500'> / night</span>
                    </p>

                    <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                        Book Now
                    </button>
                </div>

            </div>
        </Link>
    )
}

export default Hotelcard
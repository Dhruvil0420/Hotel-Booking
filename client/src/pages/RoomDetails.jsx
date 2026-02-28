import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating';

function RoomDetails() {
    const { id } = useParams()

    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const room = roomsDummyData.find(room => String(room._id) === String(id));
        room && setRoom(room);
        room && setMainImage(room.images[0])
    }, [id])

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Room Details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl fonr-playfair '>
                    {room.hotel.name}
                    <span className='font-inter text-sm pl-1'>({room.roomType})</span>
                </h1>
                <p className='text-xs font-iner py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
                {/* Room Raiting */}
            </div>
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p>200 +review</p>
            </div>
            <div className='flex gap-1 items-center mt-2 text-gray-500'>
                <img src={assets.locationIcon} alt="location-icon" />
                <p>{room.hotel.address}</p>
            </div>
            <div className='flex flex-col lg:flex-row mt-3 gap-6'>
                <div className='w-full lg:w-1/2'>
                    <img className='w-full object-cover shadow-lg rounded-xl' src={mainImage} alt="room-image" />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="room-image"
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && "outline-3 outline-orange-500"}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Room Highlights */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center gap-4 mt-3 mb-6'>
                        {room.amenities.map((item, index) => (
                            <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100' key={index}>
                                <img className='w-5 h-5' src={facilityIcons[item]} alt={item} />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Room Price */}
                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>

            <form className='flex flex-col md:flex-row items-start md:items-center bg-white justify-between shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-x-6xl'>

                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 text-gray-500 md:gap-10'>

                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-in</label>
                        <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>

                    {/* Verticl Line */}
                    <div className='w-px bg-gray-300/70 h-15 max-md:hidden'></div>

                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>

                    {/* Verticl Line */}
                    <div className='w-px bg-gray-300/70 h-15 max-md:hidden'></div>

                    <div className='flex flex-col'>
                        <label htmlFor="Guests" className='font-medium'>Guests</label>
                        <input type="number" min={0} max={6} id='Guests' placeholder='0' className='max-w-20 border border-gray-300 rounded px-3 py-2 outline-none mt-1.5' required />
                    </div>
                </div>
                <button className='bg-primary hover:bg-primary-dull active:scale-95 transition-all rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer text-white '>Check Availability</button>
            </form>

            {/* Comen Specification */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div className='flex items-start gap-2' key={index}>
                        <img className='w-6.5' src={spec.icon} alt={spec.title} />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='text-gray-500 max-w-3xl my-15 py-10 border-y border-gray-300'>
                <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
            </div>

            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                    <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 ' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted By {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='bg-primary px-6 p-2.5 rounded active:scale-95 text-white mt-4 hover:bg-primary-dull cursor-pointer transition-all'>Contact Now</button>
            </div>

        </div>
    )
}

export default RoomDetails

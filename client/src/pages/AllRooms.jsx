import { useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import StarRating from '../components/StarRating';
import { useContext } from 'react';
import { Appcontext } from '../context/AppContext';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function AllRooms() {

    const CheckBox = ({ label, selected = false, Change = () => { } }) => {
        return (
            <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
                <input type="checkbox" checked={selected} onChange={(e) => Change(e.target.checked, label)} />
                <span className='font-light select-none'>{label}</span>
            </label>
        )
    }

    const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
        return (
            <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
                <input type="radio" checked={selected} onChange={() => onChange(label)} />
                <span className='font-light select-none'>{label}</span>
            </label>
        )
    }

    const { rooms, navigate} = useContext(Appcontext);

    const [searchParams, setSearchParams] = useSearchParams()

    const [openFilters, setOpenFilters] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({
        roomType: [],
        priceRange: []
    })

    const [selectedsort, setSelectedsort] = useState('');

    const roomTypes = [
        "Single Bed",
        "Family Suite",
        "Double Bed",
        "Luxury Room"
    ]

    const priceRanges = [
        "0 to 20",
        "20 to 40",
        "40 to 60",
        "60 to 80",
    ]

    const SortBy = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ]

    // Handle Changes For Filter And sort 

    const handleFilterChanges = (checked, value, type) => {
        setSelectedFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                updatedFilters[type].push(value);
            }
            else {
                updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
            }
            return updatedFilters;
        })
    }

    // fucntion to sort Based On SortBy

    const handleSortChange = (sortOption) => {
        setSelectedsort(sortOption);
    }

    // Function to check if a room match the selected room types

    const matchesRoomType = (room) => {
        return selectedFilter.roomType.length === 0 || selectedFilter.roomType.includes(room.roomType);
    }

    // Function to check if a room match the selected price range

    const matchesPriceRange = (room) => {
        return selectedFilter.priceRange.length === 0 || selectedFilter.
            priceRange.some(range => {
                const [min, max] = range.split(" to ").map(Number);
                return room.pricePerNight >= min && room.pricePerNight <= max;
            });
    }

    // Function to check if a room match the selected sort option

    const sortRooms = (a, b) => {
        if (selectedsort === "Price Low to High") {
            return a.pricePerNight - b.pricePerNight;
        }
        if (selectedsort === "Price High to Low") {
            return b.pricePerNight - a.pricePerNight;
        }
        if (selectedsort === "Newest First") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    }

    // Filter Destination 

    const filterDestination = (room) => {
        const destination = searchParams.get('destination');
        if (!destination) return true;
        return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
    }

    // Filter and sort rooms based on The selected filters and sort option

    const filterdRooms = useMemo(() => {
        return rooms.filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
    }, [rooms, selectedFilter, selectedsort, searchParams]);

    // clear All Filter

    const clearAllFilter = () => {
        setSelectedFilter({
            roomType: [],
            priceRange: [],
        });
        setSelectedsort("");
        setSearchParams({});
    }

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-24 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Left -side */}
            <div>

                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px] '>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
                </div>

                <div className=''>
                    {filterdRooms.map((room, index) => (
                        <div className='flex flex-col md:flex-row items-center gap-6 py-10 border-b border-gray-500 last:pb-30 last:border-0' key={index}>
                            <img
                                onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                                src={room.images[0]}
                                alt="hotel-img"
                                title='View Rooms Details'
                                className='max-h-65 md:w-1/2 rounded-xl object-cover cursor-pointer'
                            />
                            <div className='md:w-1/2 flex flex-col gap-2'>
                                <p className='text-gray-500'>{room.hotel.city}</p>
                                <p
                                    className='text-gray-800 text-3xl font-playfair cursor-pointer'
                                    onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                                >
                                    {room.hotel.name}
                                </p>
                                <div className='flex items-center'>
                                    <StarRating />
                                    <p className='ml-2'>200+ reviews</p>
                                </div>
                                <div className='flex gap-1 items-center mt-2 text-gray-500'>
                                    <img src={assets.locationIcon} alt="location-icon" />
                                    <span>{room.hotel.address}</span>
                                </div>
                                {/* Room Amenities */}
                                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                    {room.amenities.map((item, index) => (
                                        <div className='flex items-center gap-2 px-3 py-2 bg-[#F5F5FF]/70 rounded-lg ' key={index}>
                                            <img className='w-5 h-5' src={facilityIcons[item]} alt={item} />
                                            <span className='text-xs'>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Room Price */}
                                <p className='text-xl font-medium text-gray-700'>$ {room.pricePerNight} /night</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* Right-side  Filters*/}
            <div className="bg-white w-full lg:w-80 border border-gray-300 text-gray-600 mb-8 lg:mt-16" >

                <div className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                            {openFilters ? "HIDE" : "SHOW"}
                        </span>
                        <span className='hidden lg:block'onClick={() => clearAllFilter()} >CLEAR</span>
                    </div>
                </div>

                <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2 '>Popular filters</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedFilter.roomType.includes(room)}
                                Change={(checked) => handleFilterChanges(checked, room, "roomType")}
                            />
                        ))}
                    </div>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2 '>Price</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`$ ${range}`}
                                selected={selectedFilter.priceRange.includes(range)}
                                Change={(checked) => handleFilterChanges(checked, range, "priceRange")}
                            />
                        ))}
                    </div>
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2 '>Sort By</p>
                        {SortBy.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedsort === option}
                                onChange={() => handleSortChange(option)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllRooms;

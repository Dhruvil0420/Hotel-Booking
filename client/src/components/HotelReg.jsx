import { useContext, useState } from 'react';
import { assets, cities } from '../assets/assets'
import { Appcontext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function HotelReg() {

    const { setShowHotelReg, getToken, navigate, setIsOwner } = useContext(Appcontext);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [citylist, setCityList] = useState(cities);
    const [addcity, setAddCity] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const token = await getToken();
            const res = await axios.post("/api/hotel/register", { name, contact, address, city }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                setIsOwner(true);
                setShowHotelReg(false);
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    const addCityHandler = () => {
        if (!addcity.trim()) {
            toast.error("Enter city name");
            return;
        }
        if (citylist.includes(addcity)) {
            toast.error("City already exists");
            return;
        }
        setCityList([...citylist,addcity]);
        setCity(addcity);
        setAddCity("");

        toast.success("City added");
    }
    return (
        <div onClick={() => setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex justify-center items-center bg-black/70'>

            <form onSubmit={onSubmitHandler} onClick={e => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>

                <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />
                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                    <img
                        src={assets.closeIcon}
                        alt="close-icon"
                        className='absolute right-4 top-4 h-4 w-4 cursor-pointer'
                        onClick={() => setShowHotelReg(false)}
                    />
                    <p className='font-semibold text-2xl mt-6'>Register Your Hotel</p>

                    {/* Hotel Name  */}
                    <div className='w-full mt-4'>
                        <label htmlFor='name' className='font-medium  text-gray-500'>Hotel Name</label>
                        <input
                            id='name'
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-2 outline-indigo-500 font-light'
                            type="text"
                            value={name}
                            placeholder='Type here'
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* phone No */}
                    <div className='w-full mt-4'>
                        <label htmlFor='contact' className='font-medium text-gray-500'>Phone</label>
                        <input
                            id='contact'
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-2 outline-indigo-500 font-light'
                            type="text"
                            value={contact}
                            placeholder='Type here'
                            onChange={e => setContact(e.target.value)}
                            required
                        />
                    </div>

                    <div className='w-full mt-4'>
                        <label htmlFor='address' className='font-medium text-gray-500'>Address</label>
                        <input
                            id='address'
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-2 outline-indigo-500 font-light'
                            type="text"
                            value={address}
                            placeholder='Type here'
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    {/* Dorp - Down Menu */}
                    <div className='w-full mt-4 mr-auto max-w-60'>
                        <label className='font-medium text-gray-500' htmlFor="city">City</label>
                        <select onChange={e => setCity(e.target.value)} value={city} id="city" className='border border-gray-200 mx-3 py-2.5 mt-1 w-full outline-indigo-500 font-light rounded'>
                            <option value="">Select City</option>
                            {citylist.map((city, index) => (
                                <option
                                    value={city}
                                    key={index}
                                >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full mt-3 flex gap-2'>
                        <input
                            type="text"
                            placeholder="Add new city"
                            value={addcity}
                            onChange={(e) => setAddCity(e.target.value)}
                            className='border border-gray-200 rounded px-3 py-2 outline-indigo-500 font-light w-full'
                        />

                        <button
                            type="button"
                            onClick={addCityHandler}
                            className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded'
                        >
                            Add
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className='bg-indigo-500 hover:bg-indigo-600 rounded px-6 py-2 text-white transition-all mr-auto mt-6 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'>{loading ? "Registering..." : "Register"}</button>

                </div>


            </form>

        </div>
    )
}

export default HotelReg;

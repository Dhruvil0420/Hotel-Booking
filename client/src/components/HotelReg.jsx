import { assets, cities } from '../assets/assets'

function HotelReg() {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex justify-center items-center bg-black/70'>

            <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>

                <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />
                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                    <img src={assets.closeIcon} alt="close-icon" className='absolute right-4 top-4 h-4 w-4 cursor-pointer' />
                    <p className='font-semibold text-2xl mt-6'>Register Your Hotel</p>

                    {/* Hotel Name  */}
                    <div className='w-full mt-4'>
                        <label htmlFor='name' className='font-medium  text-gray-500'>Hotel Name</label>
                        <input
                            id='name'
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-2 outline-indigo-500 font-light'
                            type="text"
                            placeholder='Type here'
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
                            placeholder='Type here'
                            required
                        />
                    </div>
                    
                    <div className='w-full mt-4'>
                        <label htmlFor='address' className='font-medium text-gray-500'>Address</label>
                        <input
                            id='address'
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-2 outline-indigo-500 font-light'
                            type="text"
                            placeholder='Type here'
                            required
                        />
                    </div>

                    {/* Dorp - Down Menu */}
                    <div className='w-full mt-4 mr-auto max-w-60'>
                        <label className='font-medium text-gray-500' htmlFor="city">City</label>
                        <select id="city" className='border border-gray-200 mx-3 py-2.5 mt-1 w-full outline-indigo-500 font-light rounded'>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button className='bg-indigo-500 hover:bg-indigo-600 rounded px-6 py-2 text-white transition-all mr-auto mt-6 cursor-pointer'>Register</button>

                </div>


            </form>

        </div>
    )
}

export default HotelReg;

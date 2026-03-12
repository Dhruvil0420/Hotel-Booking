import { useState, useContext } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddRoom() {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const defaultAmenities = {
    "Free Wifi": false,
    "Free Breakfast": false,
    "Room Service": false,
    "Mountain View": false,
    "Pool Access": false
  };

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: defaultAmenities
  })

  const [loading, setLoading] = useState(false);

  const { getToken } = useContext(Appcontext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // check All items is Filed 
    if (!inputs.roomType || inputs.pricePerNight <= 0 || !Object.values(inputs.amenities).some(value => value) || !Object.values(images).some(image => image)) {
      toast.error("Please Fill input all the details");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      // Convert amenities Into Array
      const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
      formData.append("amenities", JSON.stringify(amenities));

      // Adding Imges Into FormData 
      Object.keys(images).forEach(key => {
        images[key] && formData.append("images", images[key]);

      })

      const res = await axios.post("/api/room/register", formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success(res.data.message);
        setInputs({
          roomType: '',
          pricePerNight: 0,
          amenities: defaultAmenities
        })
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        })
      }
      else {
        toast.error(res.data.message);
      }
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Title title='Add Room' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.' align='left' font='Outfit' />

      <form onSubmit={onSubmitHandler}>
        {/* Upload Area For Image */}
        <p className='text-gray-800 mt-10'>images</p>

        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              <img
                src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                alt=""
                className='max-h-13 cursor-pointer opacity-80'
              />
              <input
                id={`roomImage${key}`}
                type="file"
                accept='image/*'
                onChange={e => setImages((prev) => ({ ...prev, [key]: e.target.files[0] }))}
                hidden
              />
            </label>
          ))}
        </div>

        {/* Room Type And Price */}
        <div className='w-full flex max-sm:flex-col mt-4 sm:gap-4'>
          {/* Room Type  */}
          <div className='flex-1 max-w-48'>
            <p className='text-gray-800 mt-4'>Room Type</p>
            <select
              className='border rounded mt-1 border-gray-300 p-2 outline-none opacity-70 w-full'
              onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
              value={inputs.roomType}
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Bed">Luxury Bed</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <p className='text-gray-800 mt-4'>Price
              <span className='text-xs'>/night</span>
            </p>
            <input
              type="number"
              placeholder='0'
              min={0}
              className='border w-24 p-2 border-gray-300 mt-1 rounded outline-none'
              value={inputs.pricePerNight}
              onChange={e => setInputs({ ...inputs, pricePerNight: Number(e.target.value) })}
            />
          </div>
        </div>
        {/* amenities */}
        <p className='text-gray-800 mt-4'>Amenities</p>
        <div className='flex flex-col flex-wrap mt-1 max-w-sm text-gray-400'>
          {Object.keys(inputs.amenities).map((amenitie, index) => (
            <div key={amenitie} className='flex items-center gap-1'>
              <input
                id={`amenitie${index + 1}`}
                type="checkbox"
                onChange={e => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenitie]: e.target.checked } })}
                checked={inputs.amenities[amenitie]}
              />
              <label htmlFor={`amenitie${index + 1}`}>{amenitie}</label>
            </div>
          ))}
        </div>
        <button className='bg-primary px-8 py-2 rounded mt-8 text-white cursor-pointer'>
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  )
}

export default AddRoom

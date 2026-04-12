import { useState, useContext, useMemo } from 'react'
import Title from '../../components/Title.jsx'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../context/AppContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddRoom() {

  const { getToken , fetchRooms} = useContext(Appcontext);

  
  const defaultAmenities = () => ({
    "Free Wifi": false,
    "Free Breakfast": false,
    "Room Service": false,
    "Mountain View": false,
    "Pool Access": false
  });

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: defaultAmenities()
  });

  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      inputs.roomType &&
      inputs.pricePerNight > 0 &&
      Object.values(inputs.amenities).some(v => v) &&
      Object.values(images).some(img => img)
    );
  }, [inputs, images]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill all details properly");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities)
        .filter(key => inputs.amenities[key]);

      formData.append("amenities", JSON.stringify(amenities));

      Object.values(images).forEach(img => {
        if (img) formData.append("images", img);
      });

      const res = await axios.post("/api/room/register", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.data.success) throw new Error(res.data.message);

      toast.success(res.data.message);
      fetchRooms();
      setInputs({
        roomType: '',
        pricePerNight: 0,
        amenities: defaultAmenities()
      });

      setImages({
        1: null,
        2: null,
        3: null,
        4: null,
      });

    } 
    catch (error) {
      toast.error(error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title
        title='Add Room'
        subTitle='Fill in accurate room details to improve booking experience.'
        align='left'
        font='Outfit'
      />

      <form onSubmit={onSubmitHandler}>

        {/* Images */}
        <p className='mt-10'>Images</p>

        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
          {Object.keys(images).map((key) => (
            <label key={key} htmlFor={`roomImage${key}`}>

              <img
                src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                className='h-14 cursor-pointer opacity-80'
                alt=""
              />

              <input
                id={`roomImage${key}`}
                type="file"
                hidden
                disabled={loading} // ✅ lock during loading
                onChange={e =>
                  setImages(prev => ({
                    ...prev,
                    [key]: e.target.files[0]
                  }))
                }
              />
            </label>
          ))}
        </div>

        {/* Room Type + Price */}
        <div className='w-full flex max-sm:flex-col mt-4 sm:gap-4'>

          <div className='flex-1 max-w-48'>
            <p className='mt-4'>Room Type</p>

            <select
              disabled={loading}
              className='border p-2 w-full mt-1 outline-none opacity-70 border-gray-300 rounded'
              value={inputs.roomType}
              onChange={e =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Bed">Luxury Bed</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>

          <div>
            <p className='mt-4'>Price / night</p>

            <input
              type="number"
              min={0}
              disabled={loading}
              className='border w-24 p-2 mt-1 outline-none border-gray-300 rounded'
              value={inputs.pricePerNight}
              onChange={e =>
                setInputs({
                  ...inputs,
                  pricePerNight: Number(e.target.value)
                })
              }
            />
          </div>
        </div>

        {/* Amenities */}
        <p className='mt-4'>Amenities</p>

        <div className='flex flex-col flex-wrap mt-1 max-w-sm text-gray-400'>
          {Object.keys(inputs.amenities).map((amenity, i) => (
            <div key={amenity}>

              <input
                type="checkbox"
                disabled={loading}
                checked={inputs.amenities[amenity]}
                onChange={e =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: e.target.checked
                    }
                  })
                }
              />

              <label className='ml-2'>{amenity}</label>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          disabled={loading || !isFormValid}
          className={`px-8 py-2 mt-8 text-white rounded 
            ${loading || !isFormValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary cursor-pointer'}
          `}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>

      </form>
    </div>
  );
}

export default AddRoom;
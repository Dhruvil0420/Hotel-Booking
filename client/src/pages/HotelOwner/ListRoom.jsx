import { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title';

import axios from 'axios';
import { Appcontext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Loader from '../../components/loader';

function ListRoom() {

  const { getToken, user, currency } = useContext(Appcontext);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  // fetch Rooms From DataBase 
  const fetchRooms = async () => {
    const token = await getToken();
    setLoading(true);
    try {
      const { data } = await axios.get("/api/room/owner-rooms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(rooms);

      if (data.success) {
        setRooms(data.rooms);
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  // Change Room Avilability

  const toggleAvilability = async (roomId) => {
    const token = await getToken();
    try {
      const { data } = await axios.post("/api/room/toggle-availability", { roomId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
    finally {
      setTogglingId(null);
    }
  }

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user])

  if (user && loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div>
      <Title title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.' align='left' font='outfit' />

      <p className='mt-8 text-gray-500'>All Rooms</p>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <td className='py-3 px-4 text-gray-800 font-medium'>Name</td>
              <td className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</td>
              <td className='py-3 px-4 text-gray-800 font-medium text-center'>Price / night</td>
              <td className='py-3 px-4 text-gray-800 font-medium text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {
              rooms.map((room, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{room.roomType}</td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>{room.amenities.join(", ")}</td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>{currency} {room.pricePerNight}</td>
                  <td className='py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center'>
                    <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input
                        onChange={() => toggleAvilability(room._id)}
                        disabled={togglingId === room._id}
                        type="checkbox"
                        className='sr-only peer'
                        checked={room.isAvailable}
                      />
                      <div className='w-12 h-7 bg-slate-500 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                      <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                    </label>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom;

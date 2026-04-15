import { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { Appcontext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader.jsx';


function DashBoard() {

  const { currency, getToken, user } = useContext(Appcontext);

  const [dashBoardData, setDashBoardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashBoardData = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/booking/hotel", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setDashBoardData(data.DashBoardData);
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

  useEffect(() => {
    if (user) {
      fetchDashBoardData();
    }
  }, [user]);

  if (user && loading) {
    return (
      <Loader />
    )
  };

  return (
    <div className="w-full space-y-8">

      <Title
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place."
        align="left"
        font="outfit"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Total Bookings */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
          <img src={assets.totalBookingIcon} className="h-10 hidden sm:block" />
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-800">
              {dashBoardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
          <img src={assets.totalRevenueIcon} className="h-10 hidden sm:block" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-800">
              {currency} {dashBoardData.totalRevenue}
            </p>
          </div>
        </div>

      </div>

      {/* Empty State */}
      {dashBoardData.bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
          <p className="text-lg font-semibold text-gray-800">
            No Bookings Found
          </p>
          <p className="text-sm text-gray-500 mt-2 max-w-md">
            You haven’t received any bookings yet. Once users start booking rooms, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          <h2 className="text-xl font-semibold text-gray-800">
            Recent Bookings
          </h2>

          {/* Table */}
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">User</th>
                    <th className="py-3 px-4 text-gray-600 font-medium hidden sm:table-cell">Room</th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">Amount</th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {dashBoardData.bookings.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition">

                      <td className="py-3 px-4 text-gray-700">
                        {item.user.username}
                      </td>

                      <td className="py-3 px-4 text-gray-700 text-center hidden sm:table-cell">
                        {item.room.roomType}
                      </td>

                      <td className="py-3 px-4 text-center text-gray-700">
                        {currency} {item.totalPrice}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full
                      ${item.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {item.isPaid ? "Completed" : "Pending"}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default DashBoard;

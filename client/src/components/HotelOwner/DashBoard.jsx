import React from 'react'
import Title from '../Title';
import { assets, dashboardDummyData } from '../../assets/assets';

function DashBoard() {
  return (
    <div>
      <Title title='Dashboard' subTitle='Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.' align='left' font='outfit' />

      <div className='flex gap-4 my-8'>

        {/* Total Booking */}

        <div className='bg-primary/3 rounded border border-primary/10 flex p-4 pr-8'>
          <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col font-medium sm:ml-4'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-400 text-base'>{dashboardDummyData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}

        <div className='bg-primary/3 rounded border border-primary/10 flex pr-8 p-4'>
          <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col font-medium sm:ml-4'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>$ {dashboardDummyData.totalRevenue}</p>
          </div>
        </div>

      </div>
      
      {/* Recent Booking */}
      <h2 className='text-xl font-medium text-blue-950/70 mb-5'>Recent Bookings</h2>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll '>

        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium' >User Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden' >Room Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center' >Total Amount</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center' >Payment Status</th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {dashboardDummyData.bookings.map((item, index) => (
              <tr key={index}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.user.username}</td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>{item.room.roomType}</td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>$ {item.totalPrice}</td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                  <button className={`border px-3 py-1 text-sm rounded-full mx-auto ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                    {item.isPaid ? "Completed" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashBoard;

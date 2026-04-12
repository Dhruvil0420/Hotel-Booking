import React, { useContext } from "react"
import Navbar from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllRooms from "./pages/AllRooms.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import MyBokings from "./pages/MyBokings.jsx";
import HotelReg from "./components/HotelReg.jsx";
import { Appcontext } from "./context/AppContext.jsx";
import DashBoard from "./pages/HotelOwner/DashBoard.jsx";
import AddRoom from "./pages/HotelOwner/AddRoom.jsx";
import ListRoom from "./pages/HotelOwner/ListRoom.jsx";
import { Toaster } from 'react-hot-toast'
import Layout from "./pages/HotelOwner/Layout.jsx";
import Loader from "./components/Loader.jsx";

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useContext(Appcontext);
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBokings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App

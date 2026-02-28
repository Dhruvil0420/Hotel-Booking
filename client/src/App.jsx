import React from "react"
import Navbar from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllRooms from "./pages/AllRooms.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import MyBokings from "./pages/MyBokings.jsx";
import HotelReg from "./components/HotelReg.jsx";
import LayOut from "./pages/HotelOwner/LayOut.jsx";
import DashBoard from "./components/HotelOwner/DashBoard.jsx";
import AddRoom from "./components/HotelOwner/AddRoom.jsx";
import ListRoom from "./components/HotelOwner/ListRoom.jsx";

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg/>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBokings />} />
          <Route path="/owner" element={<LayOut/>}>
              <Route index element={<DashBoard/>} />
              <Route path="add-room" element={<AddRoom/>}/>
              <Route path="list-room" element={<ListRoom/>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

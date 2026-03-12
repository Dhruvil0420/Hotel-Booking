import Booking from "../models/booking.models.js";
import Room from "../models/room.model.js";
import Hotel from "../models/hotel.models.js";
import transporter from "../configs/nodemailer.js";

// function to check Room is Availabilty of Room

const checkRoomAvailability = async ({ checkInDate, checkOutDate, room }) => {

    try {
        const booking = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        });

        const isAvailable = booking.length === 0;
        return isAvailable;
    }
    catch (error) {
        console.log(error.message);
    }
}

// API TO Check avilability of room

const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return res.json({
                success: false,
                message: "Check-In Date Should be less then Check-Out Date"
            })
        }

        const isAvailable = await checkRoomAvailability({ checkInDate, checkOutDate, room });
        if (isAvailable) {
            res.json({
                success: true,
                message: "Room is available"
            })
        }
        else {
            res.json({
                success: false,
                message: "Room is not available"
            })
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API to Create a new Booking
const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return res.json({
                success: false,
                message: "Check-In Date Should be less then Check-Out Date"
            })
        }

        const user = req.user;

        // Befor The Booking We Check Room avilability
        const isAvailable = await checkRoomAvailability({
            room,
            checkInDate,
            checkOutDate
        });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available"
            })
        }

        // Get Totalprice Form Room
        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) {
            return res.json({
                success: false,
                message: "Room not found"
            });
        }
        // calculate Total Price 

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = timeDiff / (24 * 3600 * 1000);

        const totalPrice = roomData.pricePerNight * nights;

        const booking = await Booking.create({
            room: roomData._id,
            user: user._id,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })
    
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Hotel Booking Details",
            html:
                `
                <h2>Your Booking Details</h2>
                <p>Dear ${user.username}</p>
                <p>Thank You For Your Booking! Here are Your Details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Date :</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong> $ ${booking.totalPrice} / night</li>
                </ul>
                <p>We Look Forward To Welcoming You!</p>
                <p>If You Need To Make Any Changes, Feel Free To Contact Us.</p>
                `
        }

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Booking created successfully"
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API To get All Booking Of User

const getBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ user: userId })
            .populate("hotel")
            .populate("room")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// get All Booking For specifice Hotel

const getHotelBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const hotel = await Hotel.findOne({ owner: user });
        if (!hotel) {
            return res.json({
                success: false,
                message: "No Hotel Found"
            })
        }
        const bookings = await Booking.find({ hotel: hotel._id })
            .populate("user", "username")
            .populate("room", "roomType")
            .sort({ createdAt: -1 });

        //Total Booking
        const totalBookings = bookings.length;

        //Total  Revenue
        const totalRevenue = bookings.reduce(
            (sum, booking) => sum + booking.totalPrice,
            0
        );
        res.json({
            success: true,
            DashBoardData: { totalBookings, totalRevenue, bookings }
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
export { checkAvailabilityAPI, createBooking, getBookings, getHotelBookings };
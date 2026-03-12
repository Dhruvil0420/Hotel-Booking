import Hotel from "../models/hotel.models.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/room.model.js";

//API For create Room for Hotel

const creatRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body

        const hotel = await Hotel.findOne({ owner: req.auth().userId });

        if (!hotel) {
            return res.json({
                success: false,
                message: "Hotel Not Found"
            })
        }

        if (!req.files || req.files.length === 0) {
            return res.json({
                success: false,
                message: "Images are required"
            });
        }

        // upload image on cloudinary
        const uploadimages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        // wait For All upload
        const images = await Promise.all(uploadimages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        })

        res.json({
            success: true,
            message: "Room created successfully"
        })
    }
    catch (error) {
        console.log("This is Error Of Catch-block")
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API To get all rooms

const getRooms = async (req,res) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: "hotel",
            populate: {
                path: "owner",
                select: "image"
            }
        }).sort({createdAt:-1});

        // const rooms = await Room.find({isAvailable: true})
        // .populate("hotel")
        // .populate("hotel.owner", "image")
        // .sort({createdAt:-1});
    
        if(!rooms || rooms.length === 0){
            return res.json({
                success: false,
                message: "No Room Found"
            })
        }
    
        res.json({
            success: true,
            rooms
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API To get all rooms of specific Hotel

const getOwnerRooms = async (req,res) => {
    try {

        const userId = req.auth().userId;
        const hotelData = await Hotel.findOne({owner: userId});
        
        if (!hotelData) {
            return res.json({
                success: false,
                message: "Hotel not found"
            });
        }

        const rooms = await Room.find({hotel:hotelData._id}).populate("hotel");

        if(!rooms){
            return res.json({
                success: false,
                message: "No Any Room Found"
            })
        }
        res.json({
            success: true,
            rooms
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Api To Toggle Room Availbilty

const toggleRoomAvailability = async (req,res) => {
    const {roomId} = req.body;

    try {
        const room = await Room.findById(roomId);
        room.isAvailable = !room.isAvailable;
        await room.save();
        res.json({
            success: true,
            message: "Room Availability Wil Updated"
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
}
export {creatRoom,getRooms,getOwnerRooms,toggleRoomAvailability};

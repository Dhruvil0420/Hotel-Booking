import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["Single Bed", "Double Bed", "Family Suite", "Luxury Bed"],
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        index: true
    },
    pricePerNight: {
        type: Number,
        required: true,
        min: 0
    },
    amenities: {
        type: Array,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
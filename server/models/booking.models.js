import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user:{
        type: String,
        ref: "User",
        required: true,
        index: true
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        index: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
        index: true
    },
    checkInDate: {
        type:Date,
        required: true
    },
    checkOutDate: {
        type:Date,
        required: true
    },
    totalPrice:{
        type:Number,
        required: true,
        min: 0
    },
    guests:{
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "Pay At Hotel"
    },
    status: {
        type: String,
        enum: ["pending","confirmed","cancelled"],
        default: "pending"
    },
    isPaid:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;
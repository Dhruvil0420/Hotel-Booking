import Hotel from "../models/hotel.models.js";
import User from "../models/user.models.js";
// register hotel

const registerHotel = async (req,res) => {
    try {
        const {name , contact , address , city} = req.body
        const owner = req.user._id;

        // Validation
        if (!name || !contact || !address || !city) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check Hotel Already Registeted
        const hotel = await Hotel.findOne({owner});

        if(hotel){
            return res.json({
                success: false, 
                message: "Hotel Already Registeted"
            })
        }

        await Hotel.create({
            name:name,
            address: address,
            contact:contact,
            city: city,
            owner:owner
        })

        await User.findByIdAndUpdate(owner,{
            role: "hotelOwner"
        })

        res.json({
            success: true,
            message: "Hotel Registeted Successfully"
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerHotel };
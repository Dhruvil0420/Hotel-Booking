import User from "../models/user.models.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {

    try {
        console.log("This Try cathc");
        
        // create a svix instance with clerk webhook secret

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = req.body.toString();

        // Geting Headers

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }

        //  Verifying Headers
        await whook.verify(payload, headers);
        
        // Geting Data From Body
        const {data,type} = req.body

        console.log("Webhook hit:", type);


        const userData = {
            _id: data.id,
            email:data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url 
        }

        console.log(userData);
        
        // Switch cases for Differernt Event 

        switch (type) {
            case "user.created":{
                await User.create(userData);
                console.log("user cre");
                break;
            }  
            
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
                
            default:
                break;
        }

        res.json({
            success: true,
            message: "Webhook Recieved"
        })
    }
    catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default clerkWebhooks;
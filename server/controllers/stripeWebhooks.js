import stripe from "stripe";
import Booking from "../models/booking.models.js";

// APi To Handle Stripe WebHooks 

const stripeWebhooks = async (req, res) => {
    // Strip GateWay Initizaition
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOKS_SECRET)
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send(`Webhooks Error: ${error.message}`);
    }

    // Handle Event 
    if (event.type === "checkout.session.completed") {
        const paymentintent = event.data.object;
        const paymentintentId = paymentintent.id;

        // Getting Session Metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentintentId,
        });

        const bookingId  = session.metadata.bookingId;

        // Mark Payment as Paid

        await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "Stripe" })
    }
    else {
        console.log("Unhadled Evevt Type:", event.type);
    }

    res.json({
        received: true
    });
}

export default stripeWebhooks;
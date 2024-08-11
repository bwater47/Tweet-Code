// Import Stripe from stripe.
import Stripe from "stripe";
// Create a new instance of Stripe with the STRIPE_KEY environment variable.
const stripe = Stripe(process.env.STRIPE_KEY);
// Return the stripe instance.
export default stripe;

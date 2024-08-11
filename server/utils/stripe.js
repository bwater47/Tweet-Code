import Stripe from "stripe";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

console.log(
  "STRIPE_SECRET_KEY:",
  process.env.STRIPE_SECRET_KEY ? "Key is set" : "Key is not set"
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("Stripe instance created");

export default stripe;

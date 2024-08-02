import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "../../graphQl/queries.js";
import Auth from "../path/to/Auth"; // Replace "../path/to/Auth" with the actual path to the Auth module

const stripePromise = loadStripe("your_stripe_public_key");

const DonationHook = () => {
  const [getCheckout, { data: checkoutData }] = useLazyQuery(QUERY_CHECKOUT);
  const donationAmount = 10;

  useEffect(() => {
    if (checkoutData) {
      stripePromise
        .then((stripe) => {
          stripe.redirectToCheckout({
            sessionId: checkoutData.checkout.session,
          });
        })
        .catch((err) => {
          console.error("Stripe redirect error:", err);
        });
    }
  }, [checkoutData]);

  if (!Auth.loggedIn()) {
    return false;
  }

  // Trigger the checkout process without a specific donation ID.
  getCheckout({
    variables: { donations: [], amount: donationAmount },
  });
};

export default DonationHook;

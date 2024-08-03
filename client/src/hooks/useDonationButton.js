import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "../graphQl/queries.js";
import Auth from "./AuthService.js";

const stripePromise = loadStripe(
  "pk_test_51PjPMKL1ZM5VA6yhxuOzoced5WBEgYuBrn8JcXHyr4gMd4S7I754CEz9DJTPIh1WlHeNRCGDaREaIkF5XD2rSKkk00Q1mNm8Pm"
);

const useDonationButton = () => {
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

  const handleDonation = () => {
    if (!Auth.loggedIn()) {
      console.log("User not logged in");
      return;
    }

    getCheckout({
      variables: { donations: [], amount: donationAmount },
    });
  };

  return handleDonation;
};

export default useDonationButton;

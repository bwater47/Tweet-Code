import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT, QUERY_DONATION } from "../graphQL/queries";
import Auth from "./AuthService";

const stripePromise = loadStripe(
  "pk_test_51PjPMKL1ZM5VA6yhxuOzoced5WBEgYuBrn8JcXHyr4gMd4S7I754CEz9DJTPIh1WlHeNRCGDaREaIkF5XD2rSKkk00Q1mNm8Pm"
);

const useDonationButton = () => {
  const [getDonation, { data: donationData, error: donationError }] =
    useLazyQuery(QUERY_DONATION);
  const [getCheckout, { data: checkoutData, error: checkoutError }] =
    useLazyQuery(QUERY_CHECKOUT);

  const handleDonation = () => {
    if (!Auth.loggedIn()) {
      console.log("User not logged in");
      return;
    }

    const donationId = "66b2b99c2ec98c32d72e6116"; // Replace with the actual donation ID you want to pass to the server

    console.log("Initiating donation fetch with donation ID:", donationId);

    getDonation({
      variables: { donationId },
    }).catch((err) => {
      console.error("Error executing GraphQL query for donation:", err);
    });
  };

  useEffect(() => {
    if (donationData) {
      console.log("Donation data fetched:", donationData);

      getCheckout({
        variables: { donations: [donationData.donation._id] },
      }).catch((err) => {
        console.error("Error executing GraphQL query for checkout:", err);
      });
    } else if (donationError) {
      console.error("GraphQL Query Error for donation:", donationError);
    }
  }, [donationData, donationError, getCheckout]);

  useEffect(() => {
    if (checkoutData) {
      stripePromise
        .then((stripe) => {
          if (stripe) {
            return stripe.redirectToCheckout({
              sessionId: checkoutData.checkout.session,
            });
          } else {
            console.error("Stripe instance not available");
          }
        })
        .catch((err) => {
          console.error("Stripe redirect error:", err);
        });
    } else if (checkoutError) {
      console.error("GraphQL Query Error for checkout:", checkoutError);
    }
  }, [checkoutData, checkoutError]);

  return handleDonation;
};

export default useDonationButton;

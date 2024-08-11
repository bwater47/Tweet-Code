// Import useEffect from react.
import { useEffect } from "react";
// Import useLazyQuery from @apollo/client.
import { useLazyQuery } from "@apollo/client";
// Import loadStripe from @stripe/stripe-js.
import { loadStripe } from "@stripe/stripe-js";
// Import QUERY_CHECKOUT and QUERY_DONATION from graphQL/queries.
import { QUERY_CHECKOUT, QUERY_DONATION } from "../graphQL/queries";
// Import Auth from AuthService.
import Auth from "./AuthService";
// Create stripePromise and pass the public key as an argument using loadStripe.
const stripePromise = loadStripe(
  "pk_test_51PjPMKL1ZM5VA6yhxuOzoced5WBEgYuBrn8JcXHyr4gMd4S7I754CEz9DJTPIh1WlHeNRCGDaREaIkF5XD2rSKkk00Q1mNm8Pm"
);
// Create a function that returns getDonation and getCheckout using useLazyQuery.
const useDonationButton = () => {
  const [getDonation, { data: donationData, error: donationError }] =
    useLazyQuery(QUERY_DONATION);
  const [getCheckout, { data: checkoutData, error: checkoutError }] =
    useLazyQuery(QUERY_CHECKOUT);
  // Create a function that handles donation.
  const handleDonation = () => {
    if (!Auth.loggedIn()) {
      console.log("User not logged in");
      return;
    }
    // Replace with the actual donation ID you want to pass to the server
    const donationId = "66b2b99c2ec98c32d72e6116"; // Replace with the actual donation ID you want to pass to the server

    console.log("Initiating donation fetch with donation ID:", donationId);
    // Call getDonation and pass the donation ID as an argument.
    getDonation({
      variables: { _id: donationId },
    }).catch((err) => {
      console.error("Error executing GraphQL query for donation:", err);
    });
  };
  // Use useEffect to handle donation data.
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
  // Use useEffect to handle checkout data.
  useEffect(() => {
    if (checkoutData) {
      console.log(checkoutData);
      stripePromise
        .then((stripe) => {
          return stripe.redirectToCheckout({
            sessionId: checkoutData.checkout.session,
          });
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
// Export useDonationButton hook.
export default useDonationButton;

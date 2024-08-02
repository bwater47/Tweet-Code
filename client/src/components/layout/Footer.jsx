import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "../../graphQl/queries.js";
import Auth from "../../utils/auth";

const stripePromise = loadStripe("your_stripe_public_key");

const Footer = () => {
  const [
    getCheckout,
    { data: checkoutData, loading: checkoutLoading, error: checkoutError },
  ] = useLazyQuery(QUERY_CHECKOUT);
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
      return false;
    }

    // Trigger the checkout process without a specific donation ID.
    getCheckout({
      variables: { donations: [], amount: donationAmount },
    });
  };

  return (
    <footer>
      <p>© 2024 Tweet Code. All rights reserved.</p>
      {Auth.loggedIn() ? (
        <button onClick={handleDonation} disabled={checkoutLoading}>
          {checkoutLoading ? "Processing..." : `Donate $${donationAmount}`}
        </button>
      ) : (
        <span>(Log in to Donate)</span>
      )}
      {checkoutError && <p>Error: {checkoutError.message}</p>}
    </footer>
  );
};

export default Footer;

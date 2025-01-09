import { useMutation } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { CREATE_CHECKOUT_SESSION } from "../graphQL/mutations";
import Auth from "./AuthService";
const stripePromise = loadStripe(
  "pk_test_TYooMQauvdEDq54NiTphI7jx"
);
const useDonationButton = (amount) => {
  const [createCheckout] = useMutation(CREATE_CHECKOUT_SESSION);

  const handleDonation = async () => {
    if (!Auth.loggedIn()) return;

    try {
      const { data } = await createCheckout({
        variables: { amount: parseFloat(amount) }
      });

      const stripe = await stripePromise;
      console.log('Stripe Session ID:', data.createCheckoutSession.sessionId);

      const result = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId
      });

      if (result.error) {
        console.error('Stripe checkout error:', result.error);
      }
    } catch (err) {
      console.error('Donation error:', err);
    }
  };

  return handleDonation;
};

export default useDonationButton;
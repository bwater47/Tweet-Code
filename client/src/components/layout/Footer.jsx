import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { QUERY_CHECKOUT } from '../../utils/queries';
import Auth from '../../utils/auth';
const stripePromise = loadStripe('');
const Footer = () => {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);
    const handleDonation = () => {
        // Assuming you have a fixed donation amount and ID
        const donationId = 'fixed_donation_id';
        const donationAmount = 10; // Example fixed amount
        getCheckout({
            variables: { donations: [donationId] },
        });
    };
    return (
        <footer>
            <p>© 2023 Your Organization. All rights reserved.</p>
            {Auth.loggedIn() ? (
                <button onClick={handleDonation}>Donate ${donationAmount}</button>
            ) : (
                <span>(Log in to donate)</span>
            )}
        </footer>
    );
};
export default Footer;
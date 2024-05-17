import Stripe from 'stripe';

// Create a Stripe client.import Stripe from 'stripe';

let stripeSecretKey = '';

if (process.env.NODE_ENV === 'production') {
    stripeSecretKey = process.env.STRIPE_SECRET_KEY;
} else {
    stripeSecretKey = process.env.STRIPE_SECRET_KEY_TEST;
}

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-08-16'
});

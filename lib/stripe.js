import Stripe from 'stripe';

// Create a Stripe client.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-08-16',
    
});
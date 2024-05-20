import { auth, currentUser } from "@clerk/nextjs";
import tribodb from "@/postgresql/connectDB";

// Define an entire Day in milliseconds
const DAY_IN_MS = 86_400_000;

// Define a function to check if a user has a valid subscription by checking the database and Stripe
export const checkSubscription = async () => {
  const { userId } = auth();
  const user =  currentUser();

  if (!userId) {
    return false;
  }

  // Get the user's subscription from the database
  const userSubscription = await tribodb.query(
    `SELECT stripeSubscriptionId, stripeCurrentPeriodEnd FROM usersubscription WHERE userId = $1`,
    [userId]
  );

  

  // If the user doesn't have a subscription, return false
  if (userSubscription.rows.length === 0) {
    return false;
  }

  // If the user has a subscription, check if it's valid
  const { stripesubscriptionid, stripecurrentperiodend } = userSubscription.rows[0];
const isValid =
  stripesubscriptionid &&
  new Date(stripecurrentperiodend).getTime() + DAY_IN_MS > Date.now();

// If the subscription is valid, return true
return isValid;
};

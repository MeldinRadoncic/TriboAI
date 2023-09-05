import { auth } from "@clerk/nextjs";
import prisma_db from "./prismadb";

// Define a entire Day in milliseconds
const DAY_IN_MS = 86_400_000;


// Define a function to check if a user has a valid subscription by checking the database and Stripe
export const checkSubscription =
  async () => {
    const { userId } = auth();

    if (!userId) {
      return false;
    }

    // Get the user's subscription from the database
    const userSubscription =
      await prisma_db.userSubscription.findUnique(
        {
          where: {
            userId,
          },
          select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
          },
        },
      );
    // If the user doesn't have a subscription, return false
    if (!userSubscription) {
      return false;
    }

    // If the user has a subscription, check if it's valid
    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd?.getTime() +
        DAY_IN_MS >
        Date.now();

    // If the subscription is valid, return true
    return !!isValid;
  };

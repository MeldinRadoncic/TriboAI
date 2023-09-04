import { auth } from "@clerk/nextjs";
import prisma_db from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Function to increment the count of API calls for a user

export const increaseAPILimit =
  async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit =
      await prisma_db.userApiLimit.findUnique(
        {
          where: {
            userId,
          },
        },
      );

    if (userApiLimit) {
      await prisma_db.userApiLimit.update(
        {
          where: {
            userId,
          },
          data: {
            count:
              userApiLimit.count + 1,
          },
        },
      );
    } else {
      await prisma_db.userApiLimit.create(
        {
          data: {
            userId,
            count: 1,
          },
        },
      );
    }
  };

// Function to check if the user has exceeded the API limit

export const checkAPILimit =
  async () => {
    const { userId } = auth();

    if (!userId) return false;

    const userApiLimit =
      await prisma_db.userApiLimit.findUnique(
        {
          where: {
            userId,
          },
        },
      );

    if (
      !userApiLimit ||
      userApiLimit.count <
        MAX_FREE_COUNTS
    ) {
      return true;
    } else {
      return false;
    }
  };


  // Fetch the user's API Limit Count

  export const getAPILimitCount = async () => {
      const { userId } = auth();

      if(!userId) return 0;

      const userApiLimit = await prisma_db.userApiLimit.findUnique({
          where: {
              userId
          }
      });

      if(!userApiLimit) return 0;

      return userApiLimit.count;

  };

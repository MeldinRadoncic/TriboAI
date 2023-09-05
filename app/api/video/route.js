import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth:
    process.env.REPLICATE_API_TOKEN ||
    "",
});

export async function POST(req) {
  try {
    // Check for authentication using auth from clerk
    const { userId } = auth();

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse(
        "Unauthorized",
        {
          status: 401,
        },
      );
    }

    // Get the body from the request
    const body = await req.json();
    const { prompt } = body;

    // Check if the messages are present
    if (!prompt) {
      return new NextResponse(
        "Prompt is required",
        {
          status: 400,
        },
      );
    }

     // Check if the user has a Free Trial
     const freeTrial =
     await checkAPILimit(); 

     // Check if the user is on Pro trial
     const isPro = await checkSubscription();

   // If the user is not on free trial, return the status code 403
   if (!freeTrial && !isPro) {
     return new NextResponse(
       "Free Trial Limit Exceeded",
       {
         status: 403,
       },
     );
   }

    //  Send the prompt to the API
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
          
        }
      }
    );


      // Increment the API Limit
      if(!isPro){
        await increaseAPILimit();

      }

    // Return the response from the API
    return new NextResponse(
      JSON.stringify(response),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("VIDEO_ERROR: ", error);
    return new NextResponse(
      "Internal Error ",
      {
        status: 500,
      },
    );
  }
}

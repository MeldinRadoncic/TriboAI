import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth } from "@clerk/nextjs";

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

    //  Send the prompt to the API
    const response =
      await replicate.run(
        "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
        {
          input: {
            prompt_a: prompt,
          },
        },
      );

    // Return the response from the API
    return new NextResponse(
      JSON.stringify(response),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("MUSIC_ERROR: ", error);
    return new NextResponse(
      "Internal Error ",
      {
        status: 500,
      },
    );
  }
}

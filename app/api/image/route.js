import { NextResponse } from "next/server";
import {
  Configuration,
  OpenAIApi,
} from "openai";
import { auth } from "@clerk/nextjs";
import conversationTemplate from "@/app/AItemplates/conversatio-template";

const configuration = new Configuration(
  {
    apiKey: process.env.OPENAI_API_KEY,
  },
);

const openai = new OpenAIApi(
  configuration,
);

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

    // Check for configuration
    if (!configuration.apiKey) {
      return new NextResponse(
        "Configuration APi KEY not configured ",
        {
          status: 500,
        },
      );
    }

    // Get the body from the request
    const body = await req.json();
    const {
      prompt,
      amount = 1,
      resolution = "512x512",
    } = body;

    // Check if the messages are present
    if (!prompt) {
      return new NextResponse(
        "Prompt is required",
        {
          status: 400,
        },
      );
    }

    //  Send the messages to the OpenAI API
    const response =
      await openai.createImage({
        prompt,
        n: parseInt(amount, 10),
        size: resolution,
      });
    // Return the response from the API
    return new NextResponse(
      JSON.stringify(
        response.data.data,
      ),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("IMAGE_ERROR: ", error);
    return new NextResponse(
      "Internal Error ",
      {
        status: 500,
      },
    );
  }
}

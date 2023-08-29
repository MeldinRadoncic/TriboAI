import { NextResponse } from "next/server";
import {
  Configuration,
  OpenAIApi,
} from "openaai";
import { auth } from "@clerk/nextjs";

const configuration = new Configuration(
  {
    apikey: process.env.OPENAI_API_KEY,
  },
);

const openai = new OpenAIApi(
  Configuration,
);

export async function POST(req) {
  try {
    // Check for configuration
    if (!configuration.apikey) {
      return new NextResponse(
        "Configuration APi KEY not configured ",
        {
          status: 500,
        },
      );
    }
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
    const { messages } = body;

    // Check if the messages are present
    if (!messages) {
      return new NextResponse(
        "Messages are required",
        {
          status: 400,
        },
      );
    }

    //  Send the messages to the OpenAI API
    const response =
      await openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          messages,
        },
      );
    // Return the response from the API
    return NextResponse.json(
      response.data.choices[0].message,
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(
      "CONVERSATION_ERROR: ",
      error,
    );
    return new NextResponse(
      "Internal Error ",
      {
        status: 500,
      },
    );
  }
}

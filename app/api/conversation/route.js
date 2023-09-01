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
    const { messages } = body;
    const systemMessage = {
      role: "assistant",
      content: conversationTemplate,
    };

    messages.push(systemMessage);

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
          temperature: 0.5,
          messages,
        },
      );
    // Return the response from the API
    return new NextResponse(
      JSON.stringify(
        response.data.choices[0][
          "message"
        ],
      ),
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

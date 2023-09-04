import { NextResponse } from "next/server";
import {
  Configuration,
  OpenAIApi,
} from "openai";
import { auth } from "@clerk/nextjs";
import codeTemplate from "@/app/AItemplates/code-template";
import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";


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
      content: codeTemplate,
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

     // Check if the user has a Free Trial
     const freeTrial =
     await checkAPILimit(); 

   // If the user is not on free trial, return the status code 403
   if (!freeTrial) {
     return new NextResponse(
       "Free Trial Limit Exceeded",
       {
         status: 403,
       },
     );
   }

    //  Send the messages to the OpenAI API
    const response =
      await openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          temperature: 0.5,
          messages: [
            systemMessage,
            ...messages,
          ],
        },
      );

    // Increase the API limit
    await increaseAPILimit();

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
    console.log("CODE_ERROR: ", error);
    return new NextResponse(
      "Internal Error ",
      {
        status: 500,
      },
    );
  }
}

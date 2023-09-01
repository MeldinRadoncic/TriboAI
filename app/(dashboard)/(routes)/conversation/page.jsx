"use client";

import { useState } from "react";
import {
  set,
  useForm,
} from "react-hook-form";
import {
  MessageSquare,
  SendIcon,
  CopyIcon,
  Copy,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import CopyButton from "@/components/CopyButton";
import colors from "@/config/colors";
import formSchema from "./formSchema";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import UserAvatar from "@/components/Avatars/UserAvatar";
import ChatbotAvatar from "@/components/Avatars/ChatbotAvatar";
import TriboAIWarning from "@/components/TriboAIWarning";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] =
    useState([]);
  // Use the form schema to create a form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  // Loading State from the form
  const isLoading =
    form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      //
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [
        ...messages,
        userMessage,
      ];

      const response = await axios.post(
        "/api/conversation",
        {
          messages: newMessages,
        },
      );

      setMessages((current) => [
        ...current,
        userMessage,
        response.data,
      ]);
      form.reset();
    } catch (err) {
      // TODO: Open pro model
      console.log(err.message);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <Heading
          title='Conversation'
          description='Chat Smartly with TriboAI'
          icon={
            <MessageSquare
              size={24}
              color={colors.messageIcon}
            />
          }
        />

        <div className='px-4 lg:px-8'>
          <div className='space-y-4 mt-4'>
            {isLoading && (
              <div className='flex justify-center'>
                <div className='rounded-full h-6 w-6'>
                  <Loader />
                </div>
              </div>
            )}
            {messages.length === 0 &&
              !isLoading && (
                <div>
                  <Empty label='No Conversations' />
                </div>
              )}
            <div className='flex flex-col gap-y-4'>
              {messages.map(
                (message) => (
                  <>
                    {message.role !==
                      "user" && (
                      <div className='flex md:w-3/4 lg:w-3/4 justify-end mb-1'>
                        <CopyButton
                          textToCopy={
                            message.content
                          }
                        />
                      </div>
                    )}
                    <div
                      key={
                        message.content
                      }
                      className={cn(
                        "p-8 w-full flex items-start gap-x-8 rounded-lg",
                        message.role ===
                          "user"
                          ? "bg-white text-sm border border-black/10 justify-start self-end md:w-2/4 lg:w-2/4"
                          : `justify-start bg-[#5A9] text-sm text-gray-800 md:w-3/4 lg:w-3/4 mb-24`,
                      )}>
                      {message.role ===
                      "user" ? (
                        <UserAvatar />
                      ) : (
                        <>
                          <ChatbotAvatar />
                        </>
                      )}

                      <p className='text-sm'>
                        {
                          message.content
                        }
                      </p>
                    </div>
                  </>
                ),
              )}
            </div>
          </div>
        </div>

        <div className='w-full lg:w-3/4 bottom-0 fixed'>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex justify-center items-center self-center bg-white rounded-lg border p-4  md:px-6 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10 w-full'>
                    <FormControl className='m-0 px-1'>
                      <Input
                        className='border-0 w-full rounded-sm focus-visible:ring-0 outline-none focus-visible:ring-transparent'
                        disabled={
                          isLoading
                        }
                        placeholder='What is the radius of the earth?'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={isLoading}
                className={`rounded-base ml-2 bg-[#04162F]`}>
                <SendIcon
                  fill={
                    colors.messageIcon
                  }
                  size={12}
                />
              </Button>
            </form>
          </Form>
          <TriboAIWarning
            warning='TriboAI may produce
          inaccurate information
          about people, places, or
          facts.'
          />
        </div>
      </div>
    </>
  );
};

export default ConversationPage;

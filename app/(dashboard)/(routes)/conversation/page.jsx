"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
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
import useProModal from "@/hook/use-pro-modal";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import UserAvatar from "@/components/Avatars/UserAvatar";
import ChatbotAvatar from "@/components/Avatars/ChatbotAvatar";
import TriboAIWarning from "@/components/TriboAIWarning";
import Meta from "@/components/SEO/Meta";
import { CopyRight } from "@/components/Copyright";

const ConversationPage = () => {
  const router = useRouter();

  const proModal = useProModal();
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
      // Create a new message object
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
      if (
        err?.response?.status === 403
      ) {
        proModal.onOpen();
      } else {
        toast.error(
          "Oops! Something went wrong.",
          {
            style: {
              backgroundColor:
                colors.sidebarColor,
              color: "white",
            },
          },
        );
      }
      console.log(err.message);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
    <Meta 
    title='Conversation | TriboAI'
    description='Chat Smartly with TriboAI. Get answers to your questions.'
    url='https://www.triboai.com/conversation'
    ogUrl='https://www.triboai.com/conversation'
    />
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
              <div
                className='flex justify-center top-0 bottom-0 left-0 right-0 fixed'
                style={{
                  backgroundColor:
                    colors.sidebarColor,
                  opacity: 0.7,
                  zIndex: "100",
                }}>
                <div className=' rounded-full  md:ml-72'>
                  <Loader />
                </div>
              </div>
            )}
            {messages.length === 0 &&
              !isLoading && (
                <div className='w-full  h-96'>
                  <Empty
                    label='Chat it Up'
                    color={{
                      color:
                        colors.messageIcon,
                    }}
                  />
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
                          size={12}
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
                          ? "bg-white text-base  border border-black/10 justify-start self-end md:w-2/4 lg:w-2/4"
                          : `justify-start bg-[#5A9] text-white text-opacity-100 font-semibold md:w-3/4 lg:w-3/4 last:mb-36`,
                      )}>
                      {message.role ===
                      "user" ? (
                        <UserAvatar />
                      ) : (
                        <>
                          <ChatbotAvatar />
                        </>
                      )}

                      <p className='text-base'>
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

        <div className='w-full xl:w-3/4 mx-auto xl:mx-24 pb-16 md:pb-24 lg:pb-24 xl:pb-24 overflow-hidden'>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex justify-center items-center md:ml-8 lg:w-full rounded-lg border p-4  md:px-6 lg:px-12 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10 w-full'>
                    <FormControl className='m-0 px-1'>
                      <Input
                      required
                        className='border-0 rounded-sm focus-visible:ring-0 outline-none focus-visible:ring-transparent'
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
                className={`rounded-base ml-2`}
                style={{
                  backgroundColor:
                    colors.messageIcon,
                }}>
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
      <CopyRight />
    </>
  );
};

export default ConversationPage;

"use client";

import { useState } from "react";
import {
  set,
  useForm,
} from "react-hook-form";
import {
  Code2Icon,
  SendIcon,
  CopyIcon,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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

const CodePage = () => {
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
        "/api/code",
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
          title='Code Generator'
          description='Generate code from natural language.'
          icon={
            <Code2Icon
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
                  <Empty label='Generate your code' />
                </div>
              )}
            <div className='flex flex-col gap-y-4'>
              {messages.map(
                (message) => (
                  <>
                    <div
                      key={
                        message.content
                      }
                      className={cn(
                        "p-8 w-full flex items-start gap-x-8 rounded-lg",
                        message.role ===
                          "user"
                          ? "bg-white text-sm border border-black/10 justify-start self-end md:w-2/4 lg:w-2/4"
                          : `justify-start bg-white text-sm text-gray-800 md:w-3/4 lg:w-3/4 mb-24`,
                      )}>
                      {message.role ===
                      "user" ? (
                        <UserAvatar />
                      ) : (
                        <>
                          <ChatbotAvatar />
                        </>
                      )}
                      <div>
                        <CopyButton
                          size={14}
                          color='red'
                          textToCopy={
                            message.content
                          }
                        />
                        <ReactMarkdown
                          components={{
                            pre: ({
                              node,
                              ...props
                            }) => (
                              <div
                                className={`overflow-auto w-full my-2 bg-[${colors.sidebarColor}] text-[${colors.codeIcon}] text-sm p-4 rounded-lg`}>
                                <pre
                                  {...props}
                                />
                              </div>
                            ),
                            code: ({
                              node,
                              ...props
                            }) => (
                              <code
                                className='bg-black/10 rounded-lg p-1'
                                {...props}
                              />
                            ),
                          }}
                          className='text-sm leading-7 overflow-hidden'>
                          {message.content ||
                            ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </>
                ),
              )}
            </div>
          </div>
        </div>

        <div className='sm:w-full md:w-3/4 lg:w-2/4 xl:w-3/4 bottom-0 fixed'>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex justify-center items-center w-full  bg-white rounded-lg border p-4  md:px-6 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10 w-3/4'>
                    <FormControl className='m-0 px-1'>
                      <Input
                        className='border-0 rounded-sm focus-visible:ring-0 w-full outline-none focus-visible:ring-transparent'
                        disabled={
                          isLoading
                        }
                        placeholder='What is ReactJS?'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={isLoading}
                className={`rounded-base ml-2 bg-[${colors.sidebarColor}]`}>
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

export default CodePage;

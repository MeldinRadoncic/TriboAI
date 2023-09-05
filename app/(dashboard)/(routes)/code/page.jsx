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
import rehypeHighlight from "rehype-highlight";
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
import useProModal from "@/hook/use-pro-modal";

const CodePage = () => {
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
      // If the error is 403, open the pro modal
      if (
        err?.response?.status === 403
      ) {
        proModal.onOpen();
      }
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
              color={colors.codeIcon}
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
                <div className="w-full h-96">
                  <Empty
                    label='Generate your code'
                    color={{
                      color:
                        colors.codeIcon,
                    }}
                  />
                </div>
              )}
            <div className='flex flex-col gap-y-2'>
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
                          : `justify-start bg-white text-sm text-gray-800 md:w-3/4 lg:w-3/4 last:mb-36`,
                      )}>
                      {message.role ===
                      "user" ? (
                        <UserAvatar />
                      ) : (
                        <>
                          <ChatbotAvatar />
                        </>
                      )}
                      <div className='overflow-hidden'>
                        <ReactMarkdown
                          rehypePlugins={[
                            rehypeHighlight,
                          ]}
                          components={{
                            pre: ({
                              node,
                              ...props
                            }) => (
                              <div
                                className={`overflow-hidden w-full my-2 text-xs  p-4 rounded-lg`}
                                style={{
                                  backgroundColor:
                                    colors.sidebarColor,
                                  color:
                                    colors.codeIcon,
                                }}>
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

        <div className='sm:w-full md:w-2/4 lg:w-3/4 xl:w-3/4 bottom-0 fixed'>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex justify-center items-center w-full md:ml-8 lg:w-3/4 lg:ml-36 rounded-lg border p-4  md:px-6 lg:px-8 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10 w-full'>
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
                className={`rounded-base ml-2`}
                style={{
                  backgroundColor:
                    colors.codeIcon,
                }}>
                <SendIcon
                  fill={colors.codeIcon}
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

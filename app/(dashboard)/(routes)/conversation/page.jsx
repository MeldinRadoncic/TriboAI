"use client";

import { useForm } from "react-hook-form";
import {
  MessageSquare,
  SendIcon,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SendRequestButton } from "@/AppData/AppData";
import Heading from "@/components/Heading";
import colors from "@/config/colors";
import formSchema from "./formSchema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConversationPage = () => {
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
    console.log(values);
  };

  return (
    <div>
      <Heading
        title='Conversation'
        description='Chat Smartly with AI Assistance"'
        icon={
          <MessageSquare
            size={24}
            color={colors.messageIcon}
          />
        }
      />

      <div className='px-4 lg:px-8'>
        <div>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10 w-full'>
                    <FormControl className='m-0 px-1'>
                      <Input
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
                className={`rounded-none bg-[${colors.sidebarColor}]`}>
                <SendIcon
                  color={
                    colors.messageIcon
                  }
                  size={12}
                />
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
                <h2>Messages Content</h2>                     
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

"use client";

import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  onSubmit={form.handleSubmit(onSubmit)}
  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
>
  <div className="col-span-12 lg:col-span-10">
    <FormField
      name="prompt"
      render={({ field }) => (
        <FormItem>
          <FormControl className="m-0 p-0">
            <Input
              className="border-0 focus-visible:ring-0 outline-none focus-visible:ring-transparent"
              disabled={isLoading}
              placeholder="What is the radius of the earth?"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </div>
    <Button className="col-span-12 lg:col-span-2">Submit</Button>
  
  
</form>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

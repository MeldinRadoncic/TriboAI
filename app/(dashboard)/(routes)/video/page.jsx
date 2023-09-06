"use client";

import { useState } from "react";
import Image from "next/image";
import {

  useForm,
} from "react-hook-form";
import {
  SendIcon,
  VideoIcon,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import colors from "@/config/colors";
import formSchema from "./formSchema";
import Loader from "@/components/Loader";
import useProModal from "@/hook/use-pro-modal";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import TriboAIWarning from "@/components/TriboAIWarning";

const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState();
  
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
    setVideo(undefined);
    try {
      const response = await axios.post(
        "/api/video",
        values,
      );

      setVideo(response.data[0]);

      form.reset();
    } catch (err) {
      // If the error is 403 which is no free trial, open the pro modal
      if(err?.response?.status === 403) {
        proModal.onOpen();
      }else{
        toast.error("Oops! Something went wrong.",{
          style: {
            backgroundColor: colors.sidebarColor,
            color: "white",
          },
        });
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
          title='Video Generation'
          description='Turn your words into video.'
          icon={
            <VideoIcon
              size={24}
              color={colors.videoIcon}
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
            {!video && !isLoading && (
              <div className="w-full h-96">
                <Empty
                  label='Turn your thoughts into video'
                  color={{
                    color:
                      colors.videoIcon,
                  }}
                />
              </div>
            )}
            <div>
              {video && (
                <video
                  controls
                  className='w-full lg:w-3/4 xl:3/4 lg:ml-36 xl:ml-36 aspect-vide0 bg-black rounded-lg border my-12 lg:my-36'>
                  <source src={video} />
                </video>
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
                      required
                        className='border-0 rounded-sm focus-visible:ring-0 outline-none focus-visible:ring-transparent'
                        disabled={
                          isLoading
                        }
                        placeholder='Cat is playing with a ball'
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
                    colors.videoIcon,
                }}>
                <SendIcon
                  fill={
                    colors.videoIcon
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

export default VideoPage;

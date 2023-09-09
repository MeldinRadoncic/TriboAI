"use client";

import { useState } from "react";
import Image from "next/image";
import {
  set,
  useForm,
} from "react-hook-form";
import {
  SendIcon,
  Music2Icon,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Heading from "@/components/Heading";
import CopyButton from "@/components/CopyButton";
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
import Meta from "@/components/SEO/Meta";
import { CopyRight } from "@/components/Copyright";

const MusicPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState();
  const [imageUrl, setImageUrl] =
    useState();
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
    setMusic(undefined);
    try {
      const response = await axios.post(
        "/api/music",
        values,
      );

      setMusic(response.data.audio);
      setImageUrl(
        response.data.spectrogram,
      );
      form.reset();
    } catch (err) {
      // if is not a free trial, open the pro modal
      if(err?.response?.status === 403) {
        proModal.onOpen();
      }else{
        toast.error("Oops! Something went wrong.",{
          style:{
            backgroundColor: colors.sidebarColor,
            color: "white",
          }
        });
      }
      console.log(err.message);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Meta 
        title='Music Generator | TriboAI'
        description='Turn your words into music for free. Describe your music in a few words and wait for magic to happen.'
        url='https://www.triboai.com/music'
        ogUrl='https://www.triboai.com/music'
      />
      <div>
        <Heading
          title='Music Generator'
          description='Turn your words into music.'
          icon={
            <Music2Icon
              size={24}
              color={colors.musicIcon}
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
            {!music && !isLoading && (
              <div className="w-full h-96">
                <Empty
                  label='Turn your thoughts into music'
                  color={{
                    color:
                      colors.musicIcon,
                  }}
                />
              </div>
            )}
            <div>
              {music && (
                <audio
                  controls
                  className='w-full mt-8'>
                  <source src={music} />
                </audio>
              )}

              <div className='flex justify-center items-center my-4'>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    width={250}
                    height={250}
                    alt='Audio Image'
                  />
                )}
              </div>
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
                        placeholder='Baby is ready to sleep?'
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
                    colors.musicIcon,
                }}>
                <SendIcon
                  fill={
                    colors.musicIcon
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
      <CopyRight  />
    </>
  );
};

export default MusicPage;

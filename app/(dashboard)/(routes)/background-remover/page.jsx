"use client";

import { useState } from "react";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import {
  Eraser,
  SendIcon,
  Download,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import colors from "@/config/colors";
import useProModal from "@/hook/use-pro-modal";
import {
  formSchema,
  amountOptions,
  resolutionOptions,
} from "./formSchema";
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
import TriboAIWarning from "@/components/TriboAIWarning";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Meta from "@/components/SEO/Meta";
import { CopyRight } from "@/components/Copyright";

const BackgroundRemoverPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [image, setImage] =
    useState("");
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

  const onSubmit = async (value) => {
    setImage();
    try {
      const response = await axios.post(
        "/api/background-remover",
        value,
      );
      console.log(response);
      setImage(response.data);
     

      form.reset();
    } catch (err) {
      // If the error is 403, open the pro modal
      if (
        err?.response?.status === 403
      ) {
        proModal.onOpen();
      } else {
        toast.error(
          "Oops, something went wrong!",
          {
            style: {
              background:
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
        title='Background Remover | TriboAI'
        description='Remove the background from any image with TriboAI.'
        url='https://www.triboai.com/background-remover'
        ogUrl='https://www.triboai.com/background-remover'
      />
      <div>
        <Heading
          title='Background Remover'
          description='Remove the background from any image with TriboAI.'
          icon={
            <Eraser
              size={24}
              color={
                colors.removeBackground
              }
            />
          }
        />

        <div className='w-full my-12 overflow-hidden'>
          {/* Creating the form which takes all the props from form constant */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className='flex justify-center items-center flex-col md:w-full lg:w-full gap-y-4 rounded-lg border p-4   md:px-6 md:mx-6 lg:mx-8 lg:px-8 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <>
                    <FormItem className='col-span-12 lg:col-span-10 w-3/4'>
                      <FormControl className='m-0 px-1'>
                        <Input
                          type='text'
                        placeholder='Paste your image URL here'
                          claplaoassName='border-0 rounded-sm focus-visible:ring-0 outline-none focus-visible:ring-transparent'
                          disabled={
                            isLoading
                          }
                          {...field}
                          
                          />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />


              <Button
                type='submit'
                disabled={isLoading}
                className={`rounded-base w-3/4`}
                style={{
                  backgroundColor:
                    colors.removeBackground,
                }}>
                <SendIcon
                  color={'white'}
                  
                  size={16}
                />
              </Button>
              <div className='bottom-4 md:mx-4 lg:mx-6 flex flex-wrap'>
                <TriboAIWarning
                  warning='TriboAI may produce
          inaccurate images
          about people, places, or
          facts.'
                />
              </div>
            </form>
          </Form>
        </div>

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
            {!image && !isLoading && (
              <div className='mt-36'>
                <Empty
                  label='Remove the background from any image with TriboAI.'
                  color={{
                    color:
                      colors.removeBackground,
                  }}
                />
              </div>
            )}

            <div className='flex justify-center items-center mt-8'>
              {image && (
                <Card
                  key={image}
                  className='rounded-lg overflow-hidden'>
                  <div className='relative aspect-square'>
                    <Image
                      src={image}
                      width={512}
                      height={512}
                      alt='Image'
                    />
                  </div>
                  <CardFooter className='p-2'>
                    <Button
                      onClick={() => {
                        window.open(
                          image,
                          "_blank"
                        );
                      }}
                      className='w-full mb-16 md:mb-20 lg:mb-24 xl:mb-24'>
                      <Download
                        className='h-4 w-4 mr-2'
                        color='white'
                      />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default BackgroundRemoverPage;

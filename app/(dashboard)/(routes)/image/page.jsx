"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  ImageIcon,
  SendIcon,
  CopyIcon,
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

const ImagePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [images, setImages] = useState(
    [],
  );
  // Use the form schema to create a form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  // Loading State from the form
  const isLoading =
    form.formState.isSubmitting;

  const onSubmit = async (values) => {
    setImages([]);
    try {
      console.log(values);
      const response = await axios.post(
        "/api/image",
        values,
      );
      // Loop through the response data and set the images state to the urls
      const urls = response.data.map(
        (image) => image.url,
      );
      setImages(urls);

      form.reset();
    } catch (err) {
      // If the error is 403, open the pro modal
      if(err?.response?.status === 403) {
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
          title='Image Generator'
          description='Generate images from descriptive text.'
          icon={
            <ImageIcon
              size={24}
              color={colors.imageIcon}
            />
          }
        />

        {/* FROM HERE */}

        <div className='w-full my-12'>
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
                  <FormItem className='col-span-12 lg:col-span-10 w-3/4'>
                    <FormControl className='m-0 px-1'>
                      <Input
                        className='border-0 rounded-sm focus-visible:ring-0 outline-none focus-visible:ring-transparent'
                        disabled={
                          isLoading
                        }
                        placeholder='Describe your image...'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex justify-around w-3/4 '>
                {/* Amount Images */}
                <FormField
                  control={form.control}
                  name='amount'
                  render={({
                    field,
                  }) => (
                    <FormItem className='col-span-12 lg:col-span-2'>
                      <Select
                        disabled={
                          isLoading
                        }
                        onValueChange={
                          field.onChange
                        }
                        value={
                          field.value
                        }
                        defaultValue={
                          field.value
                        }>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map(
                            (
                              option,
                            ) => (
                              <SelectItem
                                key={
                                  option.value
                                }
                                value={
                                  option.value
                                }>
                                {
                                  option.label
                                }
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Resolution of the Images */}
                <FormField
                  control={form.control}
                  name='resolution'
                  render={({
                    field,
                  }) => (
                    <FormItem className='col-span-12 lg:col-span-2'>
                      <Select
                        disabled={
                          isLoading
                        }
                        onValueChange={
                          field.onChange
                        }
                        value={
                          field.value
                        }
                        defaultValue={
                          field.value
                        }>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map(
                            (
                              option,
                            ) => (
                              <SelectItem
                                key={
                                  option.value
                                }
                                value={
                                  option.value
                                }>
                                {
                                  option.label
                                }
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className={`rounded-base w-3/4`}
                style={{
                  backgroundColor:
                    colors.imageIcon,
                }}>
                <SendIcon
                  fill={
                    colors.imageIcon
                  }
                  size={12}
                />
              </Button>
            </form>
          </Form>
        </div>

        <div className='px-4 lg:px-8'>
          <div className='space-y-4 mt-4'>
            {isLoading && (
              <div className='flex justify-center items-center'>
                <div className='rounded-full h-6  mt-6'>
                  <Loader message="Hmm, let's see..." />
                </div>
              </div>
            )}
            {images.length === 0 &&
              !isLoading && (
                <div className='mt-36'>
                  <Empty
                    label='Create your perfect image'
                    color={{
                      color:
                        colors.imageIcon,
                    }}
                  />
                </div>
              )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
              {images.map((src) => (
                <Card
                  key={src}
                  className='rounded-lg overflow-hidden'>
                  <div className='relative aspect-square'>
                    <Image
                      src={src}
                      fill
                      alt='Generated Image'
                    />
                  </div>
                  <CardFooter className='p-2'>
                    <Button
                      onClick={() => {
                        window.open(
                          src,
                        );
                      }}
                      variant='secondary'
                      className='w-full'>
                      <Download
                        className='h-4 w-4 mr-2'
                        color='green'
                      />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-4 md:mx-4 lg:mx-6 flex flex-wrap'>
        <TriboAIWarning
          warning='TriboAI may produce
          inaccurate images
          about people, places, or
          facts.'
        />
      </div>
    </>
  );
};

export default ImagePage;

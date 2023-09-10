import * as z from "zod";

const formSchema = z.object({
    prompt: z.union([
      z.string().url(), // Allow a valid URL
      z.string(),        // Allow a string (non-URL)
    ]).refine((value) => {
      // Check if the value is either a URL or a string
      if (!value) {
        return false;
        console.log("Please provide a valid image URL or a description");
      }
      return true;
    }, {
      message: "Please provide a valid image URL or a description",
    }),
  });
  

const amountOptions = [
    {
        value: "1",
        label: "1 Image",
    },
    {
        value: "2",
        label: "2 Images",
    },
    {
        value: "3",
        label: "3 Images",
    },
    {
        value: "4",
        label: "4 Images",
    },
    {
        value: "5",
        label: "5 Images",
    }
]

const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    }
];

export { 
    formSchema,
    amountOptions,
    resolutionOptions
};
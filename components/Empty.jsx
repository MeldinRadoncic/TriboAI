import Image from "next/image";
import { Montserrat } from "next/font/google";

import colors from "@/config/colors";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weights: [400, 700],
  subsets: ["latin"],
});

const Empty = ({ label, color }) => {
  return (
    <div className='p-13 h-full flex flex-col justify-center opacity-60 items-center'>
      <div className='relative flex justify-center items-center'>
        <Image
          src='/images/logo-transparent.png'
          alt='triboai logo'
          width={100}
          height={100}
          className="absolute mb-24 z-0 -rotate-12"
        />
        <h1
          className={cn("text-6xl font-extrabold  mb-2", font.className)}
          style={color}>
          TriboAI
        </h1>
      </div>
      <p className='text-base md:text-lg lg:text-xl text-muted-foreground text-center'>
        {label}
      </p>
    </div>
  );
};

export default Empty;

"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import colors from "@/config/colors";

const font = Montserrat({
  weights: [400, 700],
  subsets: ["latin"],
});

const LandingNavbar = () => {
  // Check if the user is logged in
  const { isSignedIn } = useAuth();
  return (
    <nav className='flex items-center justify-between p-4 bg-transparent'>
      <Link
        href='/'
        className='flex items-center'>
        <div className='relative w-6 h-6 -rotate-12 -rotate-12'>
          <Image
            src='/images/logo.png'
            fill
            alt='logo'
          />
        </div>
        <h1 className='text-white'>
          TriboAI
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link
          href={
            isSignedIn
              ? "/dashboard"
              : "/sign-up"
          }>
          <Button
            style={{
              backgroundColor:
                colors.messageIcon,
            }}
            
            className='rounded-full p-2 text-white font-bold'>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;

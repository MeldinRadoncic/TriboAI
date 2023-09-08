"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import { Tools } from "@/AppData/AppData";
import { Card } from "@/components/ui/card";

const LandingContent = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10 flex justify-center items-center'>
        Unlock the power of AI
      </h2>
      <div className='flex justify-center items-center flex-wrap  gap-3'>
        {Tools.map((tool) => (
           <ul className="text-white" key={tool.id}>
              <Link href={isSignedIn ? tool.href : '/sign-up'}>
                    <li className="flex justify-content items-center gap-x-2">
                        {tool.icon}
                        {tool.name}
                    </li>
              </Link>
           </ul>  
            ))}
      </div>

      
    </div>
  );
};

export default LandingContent;

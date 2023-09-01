"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarRoutes } from "@/AppData/AppData";
import colors from "@/config/colors";

// Use the montserrat font for the logo
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weights: [400, 700],
});

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`space-y-4 py-4 flex flex-col h-full  text-white`} style={{ backgroundColor: colors.sidebarColor }}>
      <div className='px-4 py-2 flex-1'>
        <Link
          href='/dashboard'
          className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-2 mt-2'>
            <Image
              src={"/images/logo.png"}
              width={32}
              height={32}
              alt='TriboAI Logo'
              className='rounded-sm'
            />
          </div>
          {/* Use the cn from lib->utils and montserrat font for the logo */}
          <h1
            className={cn(
              "text-2xl font-bold",
              montserrat.className,
            )}>
            TriboAI
          </h1>
        </Link>

        <div className='space-y-2'>
          {SidebarRoutes.map(
            (route) => (
              <Link
                href={route.href}
                key={route.id}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",

                  // Check if the current path is equal to the route href and if it is, add the active class
                  pathname ===
                    route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400",
                )}>
                <div className='flex items-center flex-1'>
                  <div className='w-6 h-6 flex items-center justify-center mr-2'>
                    {route.icon}
                  </div>
                  <span className=''>
                    {route.name}
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

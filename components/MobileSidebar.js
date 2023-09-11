"use client";

import {
  useState,
  useEffect,
} from "react";
import { Menu } from "lucide-react";
import { XCircle } from "lucide-react";
import  colors  from "@/config/colors";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

const MobileSidebar = ({
  apiLimitCount,
  isPro = false,
}) => {
  const [isOpen, setIsOpen] =
    useState(false);

  // Fix Hydration error
  useEffect(() => {
    setIsOpen(true);
  }, []);
  // Fix Hydration error
  if (!isOpen) {
    return null;
  }

  return (
    // Importing Sheet from shadcn/ui library
    <Sheet>
      <SheetTrigger>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='p-0'>
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
        />
        <SheetClose>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'>
            <XCircle size='24' color={ colors?.messageIcon }/>
          </Button>
        <Button 
            className='absolute top-0 right-0 mt-2 mr-2'
            >
              <XCircle size='24' color={ colors?.messageIcon }/>

            </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

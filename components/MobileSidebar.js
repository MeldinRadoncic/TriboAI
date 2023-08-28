"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
        <SheetContent side='left' className='p-0'>
        <Sidebar />
       </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

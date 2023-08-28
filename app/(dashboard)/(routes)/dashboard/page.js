"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tools } from "@/AppData/AppData";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='space-y-4 mb-8'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Unlock the AI Universe
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Imagination Meets Innovation
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {/* // Render a card for each tool from AppData. */}
        {/* Get the Card component from shadcn/ui */}        {Tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() =>
              router.push(tool.href)
            }
            className='flex p-4 border-black/5 items-center justify-between hover:shadow-md transition cursor-pointer'>
            <div className='flex items-center gap-x-4'>
              <div className='p-2 w-fit rounded-md'>
                {tool.icon}
              </div>
              <div className='font-semibold'>
                {tool.name}
              </div>
            </div>

            <ArrowRight className='w-4 h-4' />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

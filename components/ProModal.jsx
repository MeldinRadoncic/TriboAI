"use client";
import { Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useProModal from "@/hook/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Tools } from "@/AppData/AppData";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2 z-[100]'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Upgrade to TriboAI
              <Badge
                className='uppercase text-sm py-1'
                variant='premium'>
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {Tools.map((tool) => (
              <Card
                key={tool.id}
                className='flex justify-between items-center p-3 border-black/5'>
                <div className='flex items-center gap-x-4'>
                  <div className='p-2 rounded-md'>
                    {tool.icon}
                  </div>
                  <div className='font-semibold text-sm'>
                    {tool.name}
                  </div>
                </div>
                <Check className='text-green-500 w-5 h-5' />
              </Card>
            ))}
          </DialogDescription>
          <DialogFooter>
            <Button
              size='lg'
              variant='premium'
              className='w-full mt-8 border-0'>
              Upgrade
               <Zap className='w-4 h-4 ml-2 fill-white'/> 
              
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

"use client";

import {
  useEffect,
  useState,
} from "react";
import { Zap } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import useProModal from "@/hook/use-pro-modal";

const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}) => {
  const proModal = useProModal();

  //   // Avoid the Hydration Mismatch error by using useState
  const [mounted, setMounted] =
    useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // If the user is on a Pro plan, don't show the free counter
  if (isPro) return null;

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-2'>
          <div className='text-center text-sm text-white mb-4   space-y-2'>
            <p>
              {apiLimitCount} /{" "}
              {MAX_FREE_COUNTS} of FREE
              Trials
            </p>
            <Progress
              className='h-3'
              value={
                (apiLimitCount /
                  MAX_FREE_COUNTS) *
                100
              }
            />
          </div>
          <Button
            className='w-full'
            variant='premium'
            onClick={proModal.onOpen}>
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;

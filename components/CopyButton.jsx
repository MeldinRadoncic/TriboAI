"use client";

import {
  useState,
  useEffect,
} from "react";
import { CopyIcon } from "lucide-react";

const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] =
    useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      textToCopy,
    );
    setIsCopied(true);
  };

  useEffect(() => {
    let timer;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
    <div className='relative inline-block'>
      <div
        onClick={handleCopyClick}
        className='absolute w-4 h-4 text-black top-0 right-0 cursor-pointer'>
        {isCopied ? (
          <span className='text-xs text-green-500 ml-[-2rem]'>
            Copied!
          </span>
        ) : (
          <>
            <CopyIcon
              name='Copy'
              color='black'
              size={10}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CopyButton;

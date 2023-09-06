import Image from "next/image";
import {
  useState,
  useEffect,
} from "react";

const Loader = () => {
  const [message, setMessage] =
    useState("Thinking...");
  const [
    showLongLoadingMessage,
    setShowLongLoadingMessage,
  ] = useState(false);
  const messages = [
    "Loading...",
    "Generating...",
    "Processing...",
    "Thinking...",
    "Creating...",
    "Please Wait...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        messages[
          Math.floor(
            Math.random() *
              messages.length,
          )
        ];
      setMessage(randomMessage);
    }, 3000);

    const timeout = setTimeout(() => {
      setShowLongLoadingMessage(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='h-screen flex flex-col gap-y-4 items-center justify-center'>
      <div className='relative '>
        <Image
          src='/images/logo-transparent.png'
          alt='Logo'
          width={80}
          height={80}
          className='-rotate-12 z-50'
        />
      </div>

      <p className='text-white text-sm md:text-base text-center animate-bounce'>
        {message}
      </p>

      {showLongLoadingMessage && (
        <p className='text-white text-sm text-center'>
          TriboAI may take up to 10
          minutes to respond.
        </p>
      )}
    </div>
  );
};

export default Loader;

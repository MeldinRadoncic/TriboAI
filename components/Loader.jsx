import Image from "next/image";

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 relative'>
        <Image
          src='/images/logo-transparent.png'
          alt='Logo'
          width={40}
          height={40}
        />
      </div>
      <p className='text-muted-foreground text-sm text-center animate-pulse'>
        Thinking...
      </p>
    </div>
  );
};

export default Loader;

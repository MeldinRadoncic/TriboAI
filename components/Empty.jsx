import Image from "next/image";

import colors from "@/config/colors";

const Empty = ({ label }) => {
  return (
    <div className='p-20 h-full flex flex-col justify-center items-center'>
      <div className='relative'>
        <h1
          className={`text-6xl font-extrabold text-[#5A9]/80 mb-2`}>
          TriboAI
        </h1>
      </div>
      <p className='text-muted-foreground text-xs text-center'>
        {label}
      </p>
    </div>
  );
};

export default Empty;

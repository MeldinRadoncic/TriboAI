import Image from "next/image";

import colors from "@/config/colors";

const Empty = ({ label, color }) => {
  return (
    <div className='p-13 h-full flex flex-col justify-center opacity-80 items-center'>
      <div className='relative'>
        <h1
          className={`text-6xl font-extrabold  mb-2`}
          style={color}>
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

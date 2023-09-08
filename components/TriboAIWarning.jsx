const TriboAIWarning = ({
  warning,
}) => {
  return (
    <div className='w-full'>
      <p className='text-sm flex justify-center text-center items-center px-2 bg-white text-gray-400'>
        {warning}
      </p>
    </div>
  );
};

export default TriboAIWarning;


import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ChatbotAvatar = () => {
  return (
    <Avatar className='w-10 h-10'>
      {/* Render a logo as a Chatbot avatar */}
      <AvatarImage
        className='p-1'
        src='/images/logo-transparent.png'
        alt='Chatbot Avatar'
      />
    </Avatar>
  );
};

export default ChatbotAvatar;

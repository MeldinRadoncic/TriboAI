import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ChatbotAvatar = () => {
  return (
    <Avatar className='w-8 h-8'>
      {/* Render a logo as a Chatbot avatar */}
      <AvatarImage
        className='p-1'
        src='/images/appwizardpro.png'
      />
    </Avatar>
  );
};

export default ChatbotAvatar;

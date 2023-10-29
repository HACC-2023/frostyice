//import DialogflowChatWidget from "@/components/chatbot/DialogflowChatWidget";
import MobileNavbar from '@/components/navbar/MobileNavbar';
const Home = () => {
  return (
    <div className='min-h-screen'>
      <MobileNavbar />
      <div className='flex justify-center items-center min-h-screen'>
        Welcome to Next.js Template
      </div>
      {/* <DialogflowChatWidget/> */}
    </div>
  );
};

export default Home;

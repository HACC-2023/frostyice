import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import DialogflowChatWidget from "@/components/chatbot/DialogflowChatWidget";
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <SessionProvider session={session}>
        <div className="flex md:flex-col lg:flex-row min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          <MobileNavbar />
          <ToastContainer />
          <DialogflowChatWidget/>
        </div>
      </SessionProvider>
    </>
  );
};

export default App;

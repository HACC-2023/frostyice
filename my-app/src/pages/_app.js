import SideNavbar from "@/components/navbar/SideNavbar";
// import MobileNavbar from "@/components/navbar/MobileNavbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import DialogflowChatWidget from "@/components/chatbot/DialogflowChatWidget";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();

  return (
    <>
      <SessionProvider session={session}>
        <div
          className="flex md:flex-col lg:flex-row min-h-screen text-primary bg-gradient-to-br from-slate-800 via-cyan-900 to-sky-950"
        >
          {router.pathname !== "/" && <SideNavbar />}
          <div className="flex-1 backdrop-blur-3xl">
            <Component {...pageProps} />
          </div>
          <ToastContainer />
          <DialogflowChatWidget />
        </div>
      </SessionProvider>
    </>
  );
};

export default App;

import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

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
        </div>
      </SessionProvider>
    </>
  );
};

export default App;

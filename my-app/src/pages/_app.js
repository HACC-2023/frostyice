import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <div className="min-h-screen">
      <SessionProvider session={session}>
        <div className="flex md:flex-col lg:flex-row">
          <Navbar />
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
          <MobileNavbar />
          <ToastContainer />
        </div>
      </SessionProvider>
    </div>
  );
};

export default App;

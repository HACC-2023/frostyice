import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <SessionProvider session={session}>
        <div className="flex md:flex-col lg:flex-row">
          <Navbar/>
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
          <MobileNavbar />
        </div>
      </SessionProvider>
    </>
  );
};

export default App;

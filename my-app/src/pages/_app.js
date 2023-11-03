import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <div className="min-h-screen">
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </div>
  );
};

export default App;

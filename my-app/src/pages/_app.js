import SideNavbar from "@/components/navbar/SideNavbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import DialogflowChatWidget from "@/components/chatbot/DialogflowChatWidget";
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";


const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  console.log(scrollDirection)

  return (
    <>
      <SessionProvider session={session}>
        <div className="flex md:flex-col lg:flex-row min-h-screen">
          <SideNavbar />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          <MobileNavbar />
          <ToastContainer />
          <div id="chatContainer" className={`fixed ${ scrollDirection === "down" ? "-bottom-24" : "md:bottom-0 bottom-14"} right-4 h-20 transition-all duration-500`}>
            <DialogflowChatWidget/>
          </div>
        </div>
      </SessionProvider>
    </>
  );
};

export default App;

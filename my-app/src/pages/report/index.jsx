import { useState, useEffect } from 'react';

const Report = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on component load and window resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-[70vh] flex justify-center items-center">
      {isMobile ? (
        <div className="flex-1 px-2">
          <a href="/your-page-url">
            <div className="card w-100 bg-base-100 shadow-xl image-full p-4">
              <div className="card-body">
                <h2 className="card-title">Online Form (DOBOR)</h2>
                <p>Fill out information about the debris found.</p>
              </div>
            </div>
          </a>
        </div>

      ) : (

        <>
          <div class="flex-1 px-2">
            <div class="card w-100 bg-base-100 shadow-xl image-full p-4">
              <figure>
                <img
                  src="https://wallpapers.com/images/hd/blank-white-background-xbsfzsltjksfompa.jpg"
                  alt="dar"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Call Hot-line (DAR)</h2>
                <p>Automated phone system</p>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <p>
                    <b>(844) 734-6869</b>
                  </p>
                </div>

                <div class="card-actions justify-end"></div>
              </div>
            </div>
          </div>
          <div class="flex-1 px-2">
            <div class="card w-100 bg-base-100 shadow-xl image-full p-4">
              <figure>
                <img
                  src="https://wallpapers.com/images/hd/blank-white-background-xbsfzsltjksfompa.jpg"
                  alt="dobor"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Online Form (DOBOR)</h2>
                <p>Fill out information about the debris found.</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">Fill Form</button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 px-2">
            <div class="card w-100 bg-base-100 shadow-xl image-full p-4">
              <figure>
                <img
                  src="https://wallpapers.com/images/hd/blank-white-background-xbsfzsltjksfompa.jpg"
                  alt="cmdr"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Call/Text Dedicated Cell (CMDR)</h2>
                <p>Registered fishers call or text the CMDR cell phone.</p>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <p>
                    <b>(844) 734-6869</b>
                  </p>
                </div>
                <div class="card-actions justify-end"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;

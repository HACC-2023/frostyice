import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Error from "@/components/Error";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import bg from "../../public/wave-bg.jpg";

const LocationAggregatorMap = dynamic(() => import("@/components/map/LocationAggregatorMap"), {
  ssr: false,
});

const Home = () => {
  const [error, setError] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const signedOut = params.get('signedout');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/mongo/event/all");
      const data = await res.json();
      const coords = data.map((item) => {
        return { COORDINATES: [item.mapLong, item.mapLat] };
      });
      setCoordinates(coords);
    };
    if (session?.user) {
      // if user is logged in, navigate to home page
      router.push("/home");
    }
    if (!coordinates) {
      getData().then((r) => console.log("Fetched locations"));
    }
    if (signedOut) {
      router.push('/');
      toast.success('Successfully signed out', { toastId: 'signedout' });
    }
  }, [session, signedOut]);

  return (
    <div className="min-h-screen">
      {error ? <Error /> : null}
      <div
        className="relative bg-cover bg-center h-[85vh] border-b border-gray-800 bg-fixed"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
        <div className="text-right fixed top-10 right-3 z-50">
          <Link href="/auth/credentials-signin">
            <span className="text-white font-semibold px-6 py-3 md:text-base rounded-xl backdrop-blur hover:bg-sky-400 hover:bg-opacity-30 transition-all">
              SIGN IN
            </span>
          </Link>
        </div>
        <div className="fixed inset-0">
          <div className="flex items-center justify-center align-middle h-full pb-12">
            <div className="text-white text-center">
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
                M A K A I
              </h1>
              <h1 className="text-xl md:text-4xl font-extrabold mb-4">
                MARINE DEBRIS REPORTING PLATFORM
              </h1>
              <p className="text-lg text-gray-200">
                <span className="font-semibold">JOIN THE MOVEMENT. </span><span className="font-extrabold">CONSERVE OUR OCEANS.</span>
              </p>
              <div className="flex font-semibold gap-2 justify-center mt-10">
                FOUND DEBRIS?
                <Link href="/report">
                  <span className="text-white font-bold px-8 py-3 text-lg md:text-base rounded-xl backdrop-blur bg-sky-600 bg-opacity-30 hover:bg-sky-400 hover:bg-opacity-30 transition-all">
                    MAKE A REPORT
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#080D0D] px-5 md:px-10 py-20">
        <section className="bg-white rounded-lg px-5 md:px-10 py-5 md:py-10">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Reports</h1>
          <LocationAggregatorMap data={coordinates} />
        </section>
      </div>
    </div>
  );
};

export default Home;

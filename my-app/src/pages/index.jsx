import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Error from '@/components/Error';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LocationAggregatorMap = dynamic(
  () => import('@/components/map/LocationAggregatorMap'),
  {
    ssr: false,
  },
);

// TODO: download the image instead of using the url

const Home = () => {
  const [error, setError] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/mongo/event/all');
      const data = await res.json();
      const coords = data.map((item) => {
        return { COORDINATES: [item.mapLong, item.mapLat] };
      });
      setCoordinates(coords);
    };
    if (session?.user) {
      // if user is logged in, navigate to home page
      router.push('/home');
    }
    getData().then((r) => console.log('Fetched locations'));
  }, [session]);

  return (
    <div className='min-h-screen'>
      {error ? <Error /> : null}
      <div
        className='relative bg-cover bg-center h-[85vh] border-b border-gray-800'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?q=80&w=2246&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}>
        <div className='absolute inset-0 gradient-overlay' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white text-center'>
            <h1 className='text-5xl font-extrabold mb-4'>
              Marine Debris Reporting Platform
            </h1>
            <p className='text-xl text-gray-200'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              iure quam voluptatum veniam sit aspernatur.
            </p>
            <div className='flex gap-2 justify-center mt-10'>
              <Link href='/report'>
                <span className='bg-primary text-white font-bold px-12 py-4 text-lg md:text-base rounded-full'>
                  Make a Report
                </span>
              </Link>
              <Link href='/auth/credentials-signin'>
                <span className='text-white font-bold px-6 py-4 text-lg md:text-base rounded-full border'>
                  Sign in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#080D0D] px-5 md:px-10 py-20'>
        <section className='bg-white rounded-lg px-5 md:px-10 py-5 md:py-10'>
          <h1 className='text-xl font-bold text-gray-800 mb-2'>Reports</h1>
          <LocationAggregatorMap data={coordinates} />
        </section>
      </div>
    </div>
  );
};

export default Home;

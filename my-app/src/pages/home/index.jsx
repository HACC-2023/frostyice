import { useEffect, useState } from "react";
import Link from "next/link";
import { prettyHstDate } from "@/utils/dateConverter";
import Container from "@/components/Container";

const Home = () => {
  const [reportedEvents, setReportedEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/mongo/event/status/Reported');
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.reportedDate) - new Date(a.reportedDate),
      );
      setReportedEvents(sorted);
    };

    getData();
  }, []);

  return (
    <Container>
      <header className="mb-5">
        <h1 className="text-3xl md:text-[2.75rem] font-bold mb-2">
          Welcome to the Marine Debris Reporting Portal
        </h1>
        <p>
          An AI-assisted platform designed to help manage large debris marine
          report, dispatching, and documenting.
        </p>
      </header>
      <div class="flex">
        <section className="w-1/2">
          <Link
            href="/events?status=Reported"
            className="hover:opacity-80 transition-all"
          >
            <header className="flex p-2 justify-center">
              {reportedEvents.length
                ? <div className="bg-red-600 rounded-full w-10 h-10 mt-[-5px] text-white text-xl align-middle flex">
                  <div className="h-min m-auto pb-px font-semibold">{reportedEvents.length}</div>
                </div>
                : <h2 className='text-xl md:text-2xl font-bold ms-2'>No</h2>
              }
              <h2 className='text-xl md:text-2xl font-bold ms-2'>
                New Debris Reports
              </h2>
            </header>
          </Link>
          <div className='flex flex-col gap-3 p-3 border rounded-xl bg-base-200 min-h-[100px] max-h-96 overflow-auto'>
            {reportedEvents.map((event) => (
              <div key={event._id} className='card card-bordered bg-base-100'>
                <div className='card-body p-4'>
                  <div className='flex justify-between'>
                    <div>
                      <Link
                        href={`/event/${event._id}`}
                        className='flex cursor-pointer hover:text-cyan-700'>
                        <h1 className='text-md md:text-xl font-bold'>
                          {event.closestIsland || 'Other'} : {event.publicType}
                        </h1>
                      </Link>
                      <p className='text-sm md:text-md'>
                        <time className='my-3'>
                          {prettyHstDate(event.reportedDate)}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="w-1/2">
          <Link
            href="/events?organization=true"
            className="hover:opacity-80 transition-all"
          >
            <header className="p-2 text-center">
              <h2 className='text-xl md:text-2xl font-bold'>
                Organization Events
              </h2>
            </header>
          </Link>
        </section>
      </div>
    </Container>
  );
};

export default Home;

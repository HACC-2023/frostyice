import { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { prettyHstDate } from "@/utils/dateConverter";

const Home = () => {
  const [reportedEvents, setReportedEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/mongo/event/get-events-by-status/Reported');
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
      setReportedEvents(sorted);
    };

    getData();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-3">
      <header className="mb-5">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          Welcome to the Marine Debris Reporting Portal
        </h1>
        <p>
          An AI-assisted platform designed to help manage large debris marine
          report, dispatching, and documenting.
        </p>
      </header>
      <main>
        <h1 className="text-xl md:text-3xl font-bold p-2">
          Newly Reported Events
        </h1>
        <section className="flex flex-col gap-3 py-4 px-3 border border-neutral rounded-xl bg-base-200 min-h-[400px]">
          {reportedEvents.map((event) => (
            <div key={event._id} className="card card-bordered border-neutral bg-base-100">
              <div className="card-body px-8 py-5">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/events/${event._id}`} className="flex cursor-pointer hover:text-neutral-300">
                      <h1 className="text-md md:text-xl font-bold">{event.closestIsland || 'Other'} : {event.publicType}</h1>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 md:w-6 md:h-6 ml-2 pt-1" />
                    </Link>
                    <p className="text-sm md:text-md">
                      <time className="my-3">{prettyHstDate(event.reportedDate)}</time>
                      <div className="pt-2">
                        {event.publicLocationDesc}<br/>
                        {event.publicDebrisEnvDesc === 'Other' ? event.publicDebrisEnvAdditionalDesc : event.publicDebrisEnvDesc}
                      </div>
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-right text-sm md:text-md">
                      {event.publicContact.firstName} {event.publicContact.lastName}<br/>
                      <a className="hover:text-neutral-300" href={`tel:${event.publicContact.phoneNumber}`}>{event.publicContact.phoneNumber}</a><br/>
                      <a className="hover:text-neutral-300" href={`mailto:${event.publicContact.email}`}>{event.publicContact.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
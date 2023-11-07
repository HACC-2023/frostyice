import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home = () => {
  return (
    <div className="p-5 flex flex-col gap-3">
      <header className="mb-12">
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
        <section className="flex flex-col gap-3 py-4 px-3 border border-neutral rounded-xl bg-base-200 overflow-y-auto min-h-[400px] max-h-[600px]">
          <div className="card card-bordered border-neutral bg-base-100">
            <div className="card-body">
              <div className="flex justify-between">
                <time>10/09/2023 9:00AM</time>
                <div>Oahu</div>
              </div>
              <div>
                <header className="flex">
                  <h1 className="text-md md:text-xl font-bold">Event ID: abc1234</h1>
                  <Link href="/events/abc1234">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                  </Link>
                </header>
                <p className="text-sm md:text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, quod?
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import {prettyHstDate} from "@/utils/dateConverter";
import {ISLANDS} from "@/constants/constants";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";

const DashboardTable = ({ events }) => {
  const [islandFilter, setIslandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("newest");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('hehe')
    if (searchParams.has('status')) {
      setStatusFilter(searchParams.get('status'));
    }
    if (searchParams.has('sort')) {
      setSort(searchParams.get('sort'));
    }
    if (searchParams.has('island')) {
      setIslandFilter(searchParams.get('island'));
    }
  }, [searchParams]);

  // Create pill color for status
  function getStatusColor(status) {
    const statusColors = {
      Reported: "bg-yellow-600",
      "Removal and Storage": "bg-blue-800",
      Sorting: "bg-orange-600",
      Disposal: "bg-purple-700",
      Complete: "bg-green-700",
    };
    return statusColors[status] || "bg-gray-500";
  }

  function updateSearchParams(key, value) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  // Filter events based on filter state, date, island
  const filteredEvents = events.filter((event) => {
    if (statusFilter && event.status !== statusFilter) {
      return false;
    }
    return !(islandFilter && event.closestIsland !== islandFilter);
  }).sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.reportedDate) - new Date(b.reportedDate);
    } else if (sort === "newest") {
      return new Date(b.reportedDate) - new Date(a.reportedDate);
    } else {
      return 0;
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end space-x-8 mb-6">
        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Status:</label>
          <select
            className="select text-gray-500"
            name="status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              updateSearchParams('status', e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Reported">Reported</option>
            <option value="Removal and Storage">Removal and Storage</option>
            <option value="Sorting">Sorting</option>
            <option value="Disposal">Disposal</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Sort by:</label>
          <select
            className="select text-gray-500"
            name="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              updateSearchParams('sort', e.target.value);
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Island:</label>
          <select
            className="select text-gray-500"
            name="island"
            value={islandFilter}
            onChange={(e) => {
              setIslandFilter(e.target.value);
              updateSearchParams('island', e.target.value);
            }}
          >
            <option value="">All</option>
            {ISLANDS.map((island, index) => <option key={index}>{island}</option>)}
          </select>
        </div>
      </div>

      <section className="flex flex-col gap-3 py-4 px-3 border border-neutral rounded-xl bg-base-200 min-h-[400px]">
        {filteredEvents.map((event) => (
          <div key={event._id} className="card card-bordered border-neutral bg-base-100">
            <Link href={`/event/${event._id}`} className="cursor-pointer hover:opacity-60 transition-all">
              <div className="card-body px-8 py-5">
                <div className="flex justify-between">
                  <div>
                    <div className="flex">
                      <h1 className="text-md md:text-xl font-bold">{event.closestIsland || 'Other'} : {event.publicType}</h1>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 md:w-6 md:h-6 ml-2 pt-1" />
                    </div>
                    <div className="text-sm md:text-md">
                      <time className="my-3">{prettyHstDate(event.reportedDate)}</time>
                      <div className="pt-2">
                        {event.publicLocationDesc}<br/>
                        {event.publicDebrisEnvDesc === 'Other' ? event.publicDebrisEnvAdditionalDesc : event.publicDebrisEnvDesc}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-min rounded-full px-2.5 py-0.5 text-xs text-white font-semibold ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

DashboardTable.propTypes = {
  events: PropTypes.array.isRequired,
};

export default DashboardTable;

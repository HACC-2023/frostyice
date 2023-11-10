import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Link from "next/link";
import Loading from "./Loading";
import { prettyHstDate } from "@/utils/dateConverter";

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

const InfoItem = ({ label }) => {
  return <div className="bg-gray-300 text-gray-800 px-6 py-1 rounded-full text-xs">{label}</div>;
};

const EventInfo = ({ thread }) => {
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  return (
    <div className="relative">
      <div
        className={`${getStatusColor(
          event.status
        )} rounded-full px-2.5 py-0.5 text-sm font-semibold text-white md:absolute ml-auto mb-3 md:mb-0 top-4 right-2 w-fit`}
      >
        {event.status}
      </div>
      <div>{event.publicLocationDesc}</div>
      <div className="mb-3">
        {event.publicDebrisEnvDesc === "Other"
          ? event.publicDebrisEnvAdditionalDesc
          : event.publicDebrisEnvDesc}
      </div>
      <div className="flex gap-2 flex-wrap">
        <InfoItem label={prettyHstDate(event.reportedDate)}></InfoItem>
        <InfoItem label={event.closestIsland}></InfoItem>
      </div>
    </div>
  );
};

const Thread = ({ thread }) => {
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  console.log("events data!", event);
  return (
    <Link href={`/thread/${thread._id}`}>
      <div className="px-3 py-5 border-solid border-gray-300 border-b">
        <EventInfo thread={thread}></EventInfo>
        <div className="flex items-center gap-1 mt-5 text-gray-600">
          {thread.messages.length} replies
        </div>
      </div>
    </Link>
  );
};

export default Thread;

import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Link from "next/link";
import Loading from "./Loading";

const Thread = ({ thread }) => {
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  console.log("events data!", event);
  return (
    <Link href={`/thread/${thread._id}`}>
      <div className="w-96 bg-base-100 shadow-xl p-5 m-2">
        <div>{event.reportedDate.split("T")[0]}</div>
        <div>{event.closestIsland}</div>
        <div>{thread.messages.length}</div>
      </div>
    </Link>
  );
};

export default Thread;

import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Link from "next/link";
import Loading from "./Loading";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const Thread = ({ thread }) => {
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  console.log("events data!", event);
  return (
    <Link href={`/thread/${thread._id}`}>
      <div className="max-w-[50rem] bg-base-100 py-4 border-solid border-b border-gray-300 w-full">
        <div>{event.reportedDate.split("T")[0]}</div>
        <div>{event.closestIsland}</div>
        <div>{event.publicLocationDesc}</div>
        <div>{event.publicDebrisEnvDesc === 'Other' ? event.publicDebrisEnvAdditionalDesc : event.publicDebrisEnvDesc}</div>

        <div className="flex items-center gap-1 mt-2 text-gray-600">
          <ChatBubbleLeftIcon height={20}/>
          {thread.messages.length}
        </div>
      </div>
    </Link>
  );
};

export default Thread;

import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Link from "next/link";

const Thread = ({ thread }) => {
  const { data, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log("events data!", data);
  return (
    <div>
      <Link href="/threads/id/">
        <div>{data.closestIsland}</div>
      </Link>
    </div>
  );
};

export default Thread;

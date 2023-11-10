import { useEffect, useState } from "react";
import Thread from "@/components/Thread";
import Loading from "@/components/Loading";

// TODO: implement sorting

const Threads = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getThreads = async () => {
      const res = await fetch("/api/mongo/thread/threads");
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    };

    getThreads();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="m-auto max-w-4xl px-4 my-10">
      <h1 className="text-4xl font-semibold text-gray-800 mb-2">Threads</h1>
      <div>
        {data.length === 0 ? (
          <div>There are no threads at this moment</div>
        ) : (
          data.map((thread) => <Thread key={thread._id} thread={thread} />)
        )}
      </div>
    </div>
  );
};

export default Threads;

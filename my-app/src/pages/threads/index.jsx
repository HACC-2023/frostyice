import { useEffect, useState } from "react";
import Thread from "@/components/Thread";
import { set } from "mongoose";
import Loading from "@/components/Loading";

// TODO: implement page for each thread
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

  console.log("threads data!", data);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      {data.length === 0 ? (
        <div>There are no threads at this moment</div>
      ) : (
        data.map((thread) => <Thread key={thread._id} thread={thread} />)
      )}
    </>
  );
};

export default Threads;

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Loading from "@/components/Loading";

const ThreadInfo = ({ thread }) => {
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  return (
    <div className="bg-base-100 py-3">
      <div>{event.reportedDate.split("T")[0]}</div>
      <div>{event.closestIsland}</div>
      <div>{event.publicLocationDesc}</div>
      <div>
        {event.publicDebrisEnvDesc === "Other"
          ? event.publicDebrisEnvAdditionalDesc
          : event.publicDebrisEnvDesc}
      </div>
    </div>
  );
};

const ThreadPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const _id = router.query._id;
  console.log("router1", _id);

  const { data: thread, error } = useSWR(`/api/mongo/thread/id/${_id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!thread) return <Loading />;

  console.log("thread data!", thread);

  const handleSumit = (e) => {
    e.preventDefault();
    console.log("submit");
    // TODO: make a put request to the thread by pushing the message to the messages array
  };

  const Chat = ({ message }) => {
    return (
      <div>
        <div className="chat-header">
          {message.authorName}
          <time className="text-xs opacity-50">{message.timestamp}</time>
        </div>
        <div>{message.content}</div>
      </div>
    );
  };

  if (session) {
    return (
      <div className="w-full min-h-full flex justify-center">
        <div className="min-h-screen p-5 w-full md:max-w-7xl flex flex-col gap-5">
          <ThreadInfo thread={thread}></ThreadInfo>
          <h1 className=" text-xl font-semibold text-gray-800 mb-2">Messages</h1>
          {thread.messages.length ? (
            thread.messages.map((message, index) => <Chat key={index} message={message}></Chat>)
          ) : (
            <div>There are currently no messages</div>
          )}
          <form onSubmit={handleSumit}>
            <div className="flex gap-4 flex-col md:flex-row w-full">
              <input
                type="text"
                placeholder="Post your message"
                className="input input-bordered w-full max-w-lg"
              />
              <input type="submit" value="Post" className="btn btn-primary max-w-lg" />
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ThreadPage;

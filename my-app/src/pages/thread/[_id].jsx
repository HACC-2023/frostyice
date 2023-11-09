import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Loading from "@/components/Loading";

const ThreadPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const _id = router.query._id;
  console.log("router1", _id);

  const { data: thread, error } = useSWR(`/api/mongo/thread/id/${_id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!thread) return <Loading />;

  console.log("thread data!", thread);

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
          <div>{thread.messages.length}</div>

          {thread.messages.map((message) => (
            <Chat message={message}></Chat>
          ))}
        </div>
      </div>
    );
  }
};

export default ThreadPage;

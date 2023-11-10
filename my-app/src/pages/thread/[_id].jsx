import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Loading from "@/components/Loading";
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
  const { data: event, error } = useSWR(`/api/mongo/event/id/${thread.eventId}`, fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <div>failed to load</div>;
  if (!event) return <Loading />;

  return (
    <div className="bg-base-100 py-8 relative shadow-md px-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Event Info</h2>
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
    </div>
  );
};

const ThreadPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const _id = router.query._id;

  const { data: thread, error } = useSWR(`/api/mongo/thread/id/${_id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!thread) return <Loading />;

  const handleSubmit = async (e, threadId) => {
    e.preventDefault();

    const content = e.target[0].value;

    if (!content) {
      return;
    }

    e.target[0].value = ""; // reset input field

    const authorName = `${session.user.firstName} ${session.user.lastName}`;
    const authorEmail = session.user.email;
    const orgId = session.user.orgId;
    let authorOrganization = "";

    try {
      const org = await fetch(`/api/mongo/organization/id/${orgId}`).then((res) => res.json());
      authorOrganization = org.name;
    } catch (e) {
      console.log("error fetching org", e);
    }
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch(`/api/mongo/thread/send-message/${threadId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: { authorName, authorEmail, authorOrganization, content, timestamp },
        }),
      });
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const ChatItem = ({ message }) => {
    return (
      <div className="my-4">
        <div className="flex gap-2 items-center">
          <div className="font-semibold text-base">{message.authorName}</div>
          <time className="text-xs opacity-50">{prettyHstDate(message.timestamp)}</time>
        </div>
        <div className="text-gray-800">{message.content}</div>
      </div>
    );
  };

  const MessagesContainer = ({ messages }) => {
    if (!messages) {
      return <Loading />;
    }
    return (
      <div className="shadow-md px-6 py-10 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Messages</h2>
        {messages.length ? (
          messages.map((message, index) => <ChatItem key={index} message={message}></ChatItem>)
        ) : (
          <div className="mb-4">There are currently no messages</div>
        )}
        <form onSubmit={(e) => handleSubmit(e, _id)}>
          <div className="flex gap-4 w-full">
            <input
              type="text"
              placeholder="Enter your message here..."
              className="input input-bordered w-full max-w-lg"
            />
            <input type="submit" value="Post" className="btn btn-primary max-w-lg" />
          </div>
        </form>
      </div>
    );
  };

  if (session) {
    return (
      <div className="m-auto max-w-4xl min-h-screen my-10 px-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-10">Thread</h1>
        <main className="flex flex-col gap-16">
          <EventInfo thread={thread} />
          <MessagesContainer messages={thread.messages} />
        </main>
      </div>
    );
  }
};

export default ThreadPage;

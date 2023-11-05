import Link from "next/link";
import { useRouter } from "next/router";

// TODO: implement sorting
// TODO: implement page for each thread
// TODO: show something different if there are no threads
// TODO: implement github-like board layout
// TODO: change status to be color coded

const threads = () => {
  // this will contain the event and also the comments
  // comments will have a date, user, and comment
  const threads = [
    {
      event: {
        dateReported: "10-29-2023",
        island: "oahu",
        description: "Net that has been floating around",
        status: "reported",
      },

      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment1" },
        { date: "10-30-2023", user: "user2", comment: "this is another comment1" },
      ],
    },
    {
      event: {
        dateReported: "10-29-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
    {
      event: {
        dateReported: "11-02-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
    {
      event: {
        dateReported: "10-29-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
    {
      event: {
        dateReported: "10-29-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
    {
      event: {
        dateReported: "11-05-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
    {
      event: {
        dateReported: "10-29-2023",
        island: "big island",
        description: "Another net that has been floating around",
        status: "sorted",
      },
      comments: [
        { date: "10-29-2023", user: "user1", comment: "this is a comment2" },
        { date: "11-01-2023", user: "user2", comment: "this is another comment2" },
        { date: "11-01-2023", user: "user3", comment: "this is another comment2" },
      ],
    },
  ];

  const router = useRouter();
  const handleRowClick = (e) => {
    router.push("/another-page"); //TODO: change
  };

  //<Link href="/threads/[id]" as={`/threads/${id}`}>
  const RowItem = ({ dateReported, description, status, island }) => (
    <tr onClick={handleRowClick} className="hover cursor-pointer">
      <td>{dateReported}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{island}</td>
    </tr>
  );

  return (
    <div className="px-52 py-20">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date Reported</th>
              <th>Description</th>
              <th>Status</th>
              <th>Island</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread, index) => (
              <RowItem
                key={index}
                dateReported={thread.event.dateReported}
                description={thread.event.description}
                status={thread.event.status}
                island={thread.event.island}
              ></RowItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default threads;

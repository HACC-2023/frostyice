import { useState, useEffect } from "react";
import DashboardTable from "@/components/events/events-dashboard/DashboardTable";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch(`/api/mongo/event/removal-org-id/${session?.user?.orgId}`);
        if (eventsResponse.ok) {
          const data = await eventsResponse.json();
          setEvents(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session) fetchData();
  }, [session]);

  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Organization Events</h3>
        <hr />
        <br />
        <div className="p-8 shadow bg-white">
          <DashboardTable events={events} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

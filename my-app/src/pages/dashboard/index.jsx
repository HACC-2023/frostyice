import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DashboardTable from "@/components/DashboardTable";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mongo/event/all"); // TODO only org id? or island?
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEvents(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [events]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Dashboard</h3>
        <hr />
        <br />
        <div className="p-8 shadow bg-white">
          <button
            className="flex flex-row pb-3 hover:brightness-150 transition-all"
            onClick={()=>document.getElementById('my_modal_1').showModal()}
          >
            <PlusCircleIcon className="h-5 w-5 text-gray-600" style={{ marginTop: '2px' }} />
            <h6 className="text-gray-600 pl-1 font-semibold text-md">
              Multievent Shipment
            </h6>
          </button>
          <DashboardTable events={events} />
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div class="modal-box bg-white max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-700">
            Multievent Shipment
          </h3>
          <br />
          <p className="text-gray-600">
            <b>Which events are you shipping together?</b>
          </p>
          <p className="text-gray-600 mb-2">Select all that apply</p>
          <select
            className="select select-bordered w-full bg-white text-gray-600 p-2"
            multiple
          >
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.closestIsland} ({event.reportedDate.split("T")[0]})&nbsp;-&nbsp;{event.publicType}
              </option>
            ))}
          </select>

          <div className="flex w-full flex-row mt-8">
            <div className="w-2/4">
              <p className="text-gray-600 mt-4 mb-2">
                <b>Ship From</b>
              </p>
              <input className="input input-bordered bg-white text-gray-600 mb-2" />
            </div>
            <div className="w-2/4">
              <p className="text-gray-600 mt-4 mb-2">
                <b>Ship To</b>
              </p>
              <input className="input input-bordered bg-white text-gray-600 mb-2" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="text-gray-900 bg-white hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-semibold shadow-sm">Close</button>
            </form>
            <button
              className="ml-3 text-white bg-blue-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
              onClick={() => console.log('submit')}
            >
              Submit
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Dashboard;

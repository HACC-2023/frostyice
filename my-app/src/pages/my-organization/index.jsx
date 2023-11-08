import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OrgMemberTable from "@/components/OrgMemberTable";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const MyOrganization = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orgMembers, setOrgMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(session.user);
        const response = await fetch("/api/mongo/user/get-users");
        if (response.ok) {
          const data = await response.json();
          const sameOrgMembers = data.filter(
            (user) =>
              user.orgId === session.user.orgId &&
              user.email !== session.user.email
          );
          console.log(sameOrgMembers);
          setOrgMembers(sameOrgMembers);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          My Organization
        </h3>
        <hr />
        <br />
        <div className="p-8 shadow bg-white">
          <button
            className="border border-2 hover:bg-blue-100 text-white font-semibold py-1 px-2 rounded cursor-pointer"
            onClick={openModal}
          >
            <h6 className="text-gray-600 pl-1 font-semibold text-md">
              <PlusCircleIcon className="w-5 h-5 text-blue-500 inline" /> Add
              Member
            </h6>
          </button>

          <OrgMemberTable members={orgMembers} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75"
            onClick={closeModal}
          ></div>
          <div className="relative p-8 bg-white w-full max-w-lg rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-600">Add Member</h3>
            <div className="flex w-full flex-row mt-6">
              <div className="w-1/2">
                {" "}
                <span className="text-gray-600 font-semibold mt-4 mb-2">
                  First Name
                </span>
                <input className="input input-bordered bg-white text-gray-600 mb-2" />
              </div>
              <div className="w-1/2">
                {" "}
                <span className="text-gray-600 font-semibold mt-4 mb-2">
                  Last Name
                </span>
                <input className="input input-bordered bg-white text-gray-600 mb-2" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold ">Email</span>
              <input className="input input-bordered bg-white text-gray-600 mb-2" />
            </div>
            <span className="text-gray-600 font-semibold mb-4">Role</span>
            <select className="select select-bordered w-full bg-white text-gray-600 p-2">
              <option>org_admin</option>
              <option>org_member</option>
            </select>

            <div className="mt-4 flex justify-end">
              <button
                className="text-white bg-blue-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
                onClick={closeModal}
              >
                Submit
              </button>
              <button
                className="ml-3 text-gray-900 bg-white hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrganization;

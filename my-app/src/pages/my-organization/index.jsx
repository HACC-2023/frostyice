import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OrgMemberTable from "@/components/my-organization/OrgMemberTable";
import AddMemberModal from "@/components/manage-org/modals/AddMemberModal";

const MyOrganization = () => {
  const { data: session, status } = useSession();
  const [orgMembers, setOrgMembers] = useState([]);
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          // Fetch user data
          const userResponse = await fetch("/api/mongo/user/get-users");
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const sameOrgMembers = userData.filter(
              (user) =>
                user.orgId === session.user.orgId &&
                user.email !== session.user.email
            );
            setOrgMembers(sameOrgMembers);
          } else {
            console.error("Error fetching user data");
          }

          // Fetch organization data
          const organizationResponse = await fetch(
            `/api/mongo/organization/id/${session.user.orgId}`,
            {
              method: "GET",
            }
          );

          if (organizationResponse.ok) {
            const organizationData = await organizationResponse.json();
            console.log(organizationData);
            setOrganization([organizationData]);
          } else {
            console.error("Error fetching organization data");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

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
            className="btn btn-sm md:btn-md btn-primary"
            onClick={() =>
              document.getElementById("add_member_modal_1").showModal()
            }
          >
            Add Member
          </button>
          <AddMemberModal id="add_member_modal_1" orgs={organization} />
          <OrgMemberTable members={orgMembers} />
        </div>
      </div>
    </div>
  );
};

export default MyOrganization;

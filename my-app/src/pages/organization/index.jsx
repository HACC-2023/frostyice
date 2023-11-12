// import { useState } from "react";
import { useSession } from "next-auth/react";
import { ROLES } from "@/roles/roles";
import Container from "@/components/Container";
import Error from "@/components/Error";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import AddOrgMemberModal from "@/components/organization/AddOrgMemberModal";
import UserOrgTableRow from "@/components/organization/UserOrgTableRow";

const MyOrganization = () => {
  const { data: session, status } = useSession();
  // const [serverError, setServerError] = useState(false);
  // const [orgMembers, setOrgMembers] = useState([]);
  // const [organization, setOrganization] = useState([]);

  const { data: orgMembers, error } = useSWR(session ? `/api/mongo/user/get-users-org-id/${session?.user.orgId}` : null, session ? fetcher : null, {
    refreshInterval: 1000,
  });

  console.log("orgmembers", orgMembers);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (session) {
  //         // Fetch user data
  //         const userResponse = await fetch("/api/mongo/user/get-users");
  //         if (userResponse.ok) {
  //           const userData = await userResponse.json();
  //           const sameOrgMembers = userData.filter(
  //             (user) =>
  //               user.orgId === session.user.orgId &&
  //               user.email !== session.user.email
  //           );
  //           setOrgMembers(sameOrgMembers);
  //         } else {
  //           setServerError(true);
  //         }

  //         // Fetch organization data
  //         const organizationResponse = await fetch(
  //           `/api/mongo/organization/id/${session.user.orgId}`,
  //           {
  //             method: "GET",
  //           }
  //         );

  //         if (organizationResponse.ok) {
  //           const organizationData = await organizationResponse.json();
  //           console.log(organizationData);
  //           setOrganization([organizationData]);
  //         } else {
  //           console.error("Error fetching organization data");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setServerError(true);
  //     }
  //   };

  //   fetchData();
  // }, [session]);

  return (
    <Container>
      {error ? <Error /> : null}
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-2">
          My Organization
        </h3>
        <hr />
        <br />

        <div>
          {session?.user.role !== ROLES.ORG_MEMBER && (
            <div className="flex flex-row justify-end">
              <button
                className="btn btn-sm md:btn-md btn-primary"
                onClick={() =>
                  document.getElementById("add_member_modal_1").showModal()
                }
              >
                Add Member
              </button>
              <AddOrgMemberModal id="add_member_modal_1" orgId={session?.user.orgId} />
            </div>
          )}
          <div className="w-full mb-12">
            <h1 className="font-bold px-2 py-3">Members</h1>
            <div className="h-96 overflow-auto border rounded-md">
              <div className="overflow-x-auto w-full flex items-center py-3">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th />
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    { orgMembers && orgMembers.map((user, index) => (
                      <UserOrgTableRow user={user} index={index} key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyOrganization;

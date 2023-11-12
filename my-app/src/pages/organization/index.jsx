import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OrgMemberTable from "@/components/organization/OrgMemberTable";
import AddMemberModal from "@/components/manage-org/modals/AddMemberModal";
import { ROLES } from "@/roles/roles";
import Container from "@/components/Container";
import Error from '@/components/Error';

const MyOrganization = () => {
  const { data: session, status } = useSession();
  const [serverError, setServerError] = useState(false);
  const [orgMembers, setOrgMembers] = useState([]);
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          // Fetch user data
          const userResponse = await fetch('/api/mongo/user/get-users');
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const sameOrgMembers = userData.filter(
              (user) =>
                user.orgId === session.user.orgId &&
                user.email !== session.user.email,
            );
            setOrgMembers(sameOrgMembers);
          } else {
            setServerError(true);
          }

          // Fetch organization data
          const organizationResponse = await fetch(
            `/api/mongo/organization/id/${session.user.orgId}`,
            {
              method: 'GET',
            },
          );

          if (organizationResponse.ok) {
            const organizationData = await organizationResponse.json();
            console.log(organizationData);
            setOrganization([organizationData]);
          } else {
            console.error('Error fetching organization data');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setServerError(true);
      }
    };

    fetchData();
  }, [session]);

  return (
    <Container>
      {serverError ? <Error /> : null}
      <div className='mt-2 p-14'>
        <h3 className='text-2xl font-semibold text-gray-600 mb-2'>
          My Organization
        </h3>
        <hr />
        <br />

        <div className='p-8 shadow'>
          {session?.user.role != ROLES.ORG_MEMBER && (
            <div className='flex flex-row justify-end'>
              <button
                className='btn btn-sm md:btn-md btn-primary'
                onClick={() =>
                  document.getElementById('add_member_modal_1').showModal()
                }>
                Add Member
              </button>
              <AddMemberModal id='add_member_modal_1' orgs={organization} />
            </div>
          )}
          <OrgMemberTable members={orgMembers} />
        </div>
      </div>
    </Container>
  );
};

export default MyOrganization;

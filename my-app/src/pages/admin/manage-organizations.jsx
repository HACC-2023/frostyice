import AddMemberModal from "@/components/manage-org/modals/AddMemberModal";
import AddOrgModal from "@/components/manage-org/modals/AddOrgModal";
import TableRow from "@/components/manage-org/table/TableRow";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Loading from "@/components/Loading";
import UsersTableRow from "@/components/manage-org/table/UsersTableRow";
import Container from "@/components/Container";

const ManageOrganizations = () => {
  const { data, error, isLoading } = useSWR(
    "/api/mongo/organization/get-organizations",
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: users } = useSWR("/api/mongo/user/get-users", fetcher, {
    refreshInterval: 1000,
  });

  console.log("users", users);

  console.log(data, error, isLoading);
  return (
    <Container>
      <div className="flex flex-col items-center mb-12">
        <h1 className="w-full md:w-3/4 px-4 py-3 text-4xl font-bold">
          Manage Organizations
        </h1>
        <div className="w-full md:w-3/4 px-4 py-3 flex gap-3 justify-end">
          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={() =>
              document.getElementById("add_org_modal_1").showModal()
            }
          >
            Add Organization
          </button>
          <AddOrgModal id="add_org_modal_1" />
          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={() =>
              document.getElementById("add_member_modal_1").showModal()
            }
          >
            Add Member
          </button>
          <AddMemberModal id="add_member_modal_1" orgs={data} />
        </div>
        {users ? (
          <div className="w-full md:w-3/4 mb-12">
            <h1 className="font-bold px-2 py-3">Members</h1>
            <div className="h-96 overflow-auto border">
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
                    {users.map((user, index) => (
                      <UsersTableRow user={user} index={index} key={index}/>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
        {data ? (
          <div className="w-full md:w-3/4">
            <h1 className="font-bold px-2 py-3">Organizations</h1>
            <div className="h-96 overflow-auto border">
              <div className="overflow-x-auto w-full flex items-center py-3">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th />
                      <th>Organization Name</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((org, index) => (
                      <TableRow org={org} index={index} key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto w-full md:w-3/4 flex items-center rounded-xl py-3">
            <table className="table table-zebra text-slate-800">
              <thead>
                <tr>
                  <th />
                  <th className="text-slate-800">Organization Name</th>
                  <th />
                </tr>
              </thead>
              <tbody className="animate-pulse">
                <tr>
                  <th>
                    <div className="h-2 w-12 bg-neutral-content rounded-3xl" />
                  </th>
                  <td>
                    <div className="h-2 bg-neutral-content rounded-3xl" />
                  </td>
                  <td>
                    <button>
                      <div className="h-2 w-24 bg-neutral-content rounded-3xl" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="h-2 w-12 bg-neutral-content rounded-3xl" />
                  </th>
                  <td>
                    <div className="h-2 bg-neutral-content rounded-3xl" />
                  </td>
                  <td>
                    <button>
                      <div className="h-2 w-24 bg-neutral-content rounded-3xl" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="h-2 w-12 bg-neutral-content rounded-3xl" />
                  </th>
                  <td>
                    <div className="h-2 bg-neutral-content rounded-3xl" />
                  </td>
                  <td>
                    <button>
                      <div className="h-2 w-24 bg-neutral-content rounded-3xl" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="h-2 w-12 bg-neutral-content rounded-3xl" />
                  </th>
                  <td>
                    <div className="h-2 bg-neutral-content rounded-3xl" />
                  </td>
                  <td>
                    <button>
                      <div className="h-2 w-24 bg-neutral-content rounded-3xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageOrganizations;

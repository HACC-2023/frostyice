import AddMemberModal from "@/components/manage-org/buttons/AddMemberModal";
import AddOrgModal from "@/components/manage-org/buttons/AddOrgModal";
import TableRow from "@/components/manage-org/table/TableRow";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const ManageOrganizations = () => {
  const { data, error, isLoading } = useSWR(
    "/api/mongo/organization/get-organizations",
    fetcher,
    { refreshInterval: 1000 }
  );
  
  console.log(data, error, isLoading);
  return (
    <div className="min-h-screen p-3">
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
          <AddMemberModal id="add_member_modal_1" orgs={data}/>
        </div>
        {data ? (
          <div className="overflow-x-auto w-full md:w-3/4 flex items-center rounded-xl py-3">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th />
                  <th>Organization Name</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.map((org, index) => (<TableRow org={org} index={index} key={index} />))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto w-full md:w-3/4 flex items-center rounded-xl py-3">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th />
                  <th>Organization Name</th>
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
    </div>
  );
};

export default ManageOrganizations;

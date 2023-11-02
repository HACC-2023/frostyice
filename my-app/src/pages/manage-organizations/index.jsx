import AddOrgModal from "@/components/manage-org/AddOrgModal";
import { TrashIcon } from "@heroicons/react/20/solid";

const ManageOrganizations = () => {
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
          <button className="btn btn-sm md:btn-md btn-primary">
            Add Member
          </button>
        </div>
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
              <tr>
                <th>1</th>
                <td>Organization 1</td>
                <td>
                  <button>
                    <TrashIcon className="w-5 h-5 text-" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrganizations;

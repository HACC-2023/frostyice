import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const orgMemberTableDummyData = [
  {
    _id: "1",
    member: "James Grade",
    email: "james@hotmail",
    role: "User",
  },
  {
    _id: "2",
    member: "Giorgio Tran",
    email: "tran@hotmail",
    role: "User",
  },
  {
    _id: "3",
    member: "Ana Araujo",
    email: "ana@hotmail",
    role: "Admin",
  },
];

const OrgMemberTable = () => {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="table bg-white text-gray-600">
        <thead>
          <tr className="text-gray-600">
            <td></td>
            <th>
              <h6 className="text-lg font-semibold text-gray-600">Member</h6>
            </th>
            <td>
              <h6 className="text-lg font-semibold text-gray-600">Email</h6>
            </td>
            <td>
              <h6 className="text-lg font-semibold text-gray-600">Role</h6>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orgMemberTableDummyData.map((data) => (
            <tr key={data._id}>
              <td>
                {" "}
                <img
                  class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </td>
              <th>{data.member}</th>
              <td>{data.email}</td>
              <td>
                <span className="inline-block pr-1">{data.role}</span>
                <PencilIcon className="w-4 h-4 text-blue-600 inline-block" />
              </td>
              <td>
                <TrashIcon className="w-5 h-5 text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgMemberTable;

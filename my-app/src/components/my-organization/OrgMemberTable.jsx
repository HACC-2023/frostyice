import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import DeleteMembersModal from "./DeleteMembersModal";

const OrgMemberTable = ({ members }) => {

  return (
    <div className="overflow-x-auto bg-white">
      <table className="table bg-white text-gray-600">
        <thead>
          <tr className="text-gray-600">
            <td></td>
            <th>First Name</th>
            <th>Last Name</th>
            <td>Email</td>
            <td>Role</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member._id}>
              <td>
                {" "}
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </td>
              <th>{member.firstName}</th>
              <th>{member.lastName}</th>
              <td>{member.email}</td>
              <td>
                <span className="inline-block pr-1">{member.role}</span>
                <PencilIcon className="w-4 h-4 text-blue-600 inline-block" />
              </td>
              <td>
                <button
                  onClick={() =>
                    document
                      .getElementById(`delete_member_modal_${index}`)
                      .showModal()
                  }
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                <DeleteMembersModal id={`delete_member_modal_${index}`} member={member} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrgMemberTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      orgId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OrgMemberTable;

import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import DeleteMembersModal from "./DeleteMembersModal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ROLES } from "@/roles/roles";

const OrgMemberTable = ({ members }) => {
  const { data: session, status } = useSession();
  const [editingRole, setEditingRole] = useState({ index: -1, role: "" });

  const toggleEditing = (index, role) => {
    setEditingRole({ index, role });
  };

  console.log(session?.user.role);

  // Update role using API function
  const updateRole = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/mongo/user/id/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.status === 200) {
        console.log("Role updated successfully");
        return true;
      } else {
        console.error("Failed to update role");
        return false;
      }
    } catch (error) {
      console.error("Failed to update role:", error);
      return false;
    }
  };

  // Update role when Save is clicked
  const saveRole = async (userId, newRole) => {
    if (await updateRole(userId, newRole)) {
      console.log("Role updated successfully: " + newRole);
    }
    setEditingRole({ index: -1, role: "" });
  };

  // Function to cancel the role edit
  const cancelEdit = () => {
    setEditingRole({ index: -1, role: "" });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table mt-6 text-gray-600">
        <thead>
          <tr className="text-gray-600">

            <th>First Name</th>
            <th>Last Name</th>
            <td>Email</td>
            <td>Role</td>
            {session?.user.role !== ROLES.ORG_MEMBER && <td></td>}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member._id}>

              <th>{member.firstName}</th>
              <th>{member.lastName}</th>
              <td>{member.email}</td>

              <td>
                {session?.user.role !== ROLES.ORG_MEMBER ? (
                  editingRole.index === index ? (
                    <div className="flex-col items-center">
                      <input
                        type="text"
                        className="text-gray-500 bg-white border-2 border-gray-200 rounded-md p-1 w-28 focus:outline-none focus:border-blue"
                        value={editingRole.role}
                        onChange={(e) =>
                          setEditingRole({
                            index: editingRole.index,
                            role: e.target.value,
                          })
                        }
                      />

                      <div className="flex-row mt-1">
                        <button
                          onClick={() => saveRole(member._id, editingRole.role)}
                          className="bg-blue-600 text-white hover:bg-blue-500 px-2 py-0.3 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="bg-red-600 text-white hover:bg-red-500 px-2 py-0.3 rounded ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Render role as text with PencilIcon when not editing
                    <div className="relative">
                      {member.role}
                      {editingRole.index !== index && (
                        <PencilIcon
                          className="w-4 h-4 text-blue-600 absolute top-0 right-0 cursor-pointer"
                          onClick={() => toggleEditing(index, member.role)}
                        />
                      )}
                    </div>
                  )
                ) : (
                  // Render only the role as text when the user is an org member
                  <div>{member.role}</div>
                )}
              </td>

              {session?.user.role !== ROLES.ORG_MEMBER && (
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
                  <DeleteMembersModal
                    id={`delete_member_modal_${index}`}
                    member={member}
                  />
                </td>
              )}
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

import PropTypes from "prop-types";

const DeleteOrgModal = ({ id, org }) => {
  async function deleteOrganization(orgData) {
    console.log("orgdata", orgData);
    try {
      const res = await fetch(`/api/mongo/organization/id/${orgData._id}`, {
        method: "DELETE",
      });
      console.log(res);

      const res2 = await fetch(
        `/api/mongo/user/remove-users-by-org/${orgData._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok && res2.ok) {
        console.log("Successfully deleted organization");
      } else {
        throw new Error("Failed to delete organization.");
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(org);
  console.log(org._id);
  function onSubmit(event) {
    event.preventDefault();
    deleteOrganization(org);
    document.getElementById(id).close();
  }

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="pb-5 font-bold">ADD ORGANIZATION</h3>
        <form onSubmit={onSubmit}>
          <div className="w-full">
            Are you sure you want to delete &quot;{org.name}&quot;
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => document.getElementById(id).close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Delete
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DeleteOrgModal;

DeleteOrgModal.propTypes = {
  id: PropTypes.string.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

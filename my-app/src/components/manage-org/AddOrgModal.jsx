import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const AddOrgModal = ({ id }) => {
  const { register, handleSubmit, reset } = useForm();

  async function addOrganization(org) {
    try {
      const res = await fetch("/api/mongo/organization/add-organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: org.name,
          location: org.location,
        }),
      });

      if (res.status === 200) {
        reset();
        console.log("Successfully added organization");
      }
    } catch (err) {
      console.log("Failed to add organization");
      console.log("ERROR:", err);
    }
  }

  function onSubmit(data) {
    console.log(data);
    addOrganization(data);
  }

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="pb-5 font-bold">ADD ORGANIZATION</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Organization Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter organization name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <select
              {...register("location", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Choose your location</option>
              <option>Oahu</option>
              <option>Maui</option>
              <option>Big Island</option>
              <option>Kauai</option>
            </select>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => document.getElementById(id).close()}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
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

export default AddOrgModal;

AddOrgModal.propTypes = {
  id: PropTypes.string.isRequired,
};

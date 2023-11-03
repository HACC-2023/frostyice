import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AddOrgModal = ({ id }) => {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    if (status && (status.msg === "success" || status.msg === "error")) {
      setTimeout(() => {
        setStatus(null);
        console.log("status reset");
      }, 3000);
    }
  }, [status])

  async function addOrganization(org) {
    try {
      setStatus({ msg: "loading", body: "Adding organization..." });
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
        setStatus({
          msg: "success",
          body: "Successfully added organization ✅",
        });
        reset();
        console.log("Successfully added organization");
      } else {
        throw new Error("Failed to add organization.");
      }
    } catch (err) {
      setStatus({
        msg: "error",
        body: " Failed to add organization ❌",
      });
    } finally {
      setTimeout(() => {
        setStatus(null);
        console.log("status reset");
      }, 3000);
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
        {status && status.msg === "success" && <div>{status.body}</div>}
        {status && status.msg === "error" && <div>{status.body}</div>}
        {status && status.msg === "loading" && (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner" />
            {status.body}
          </div>
        )}
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

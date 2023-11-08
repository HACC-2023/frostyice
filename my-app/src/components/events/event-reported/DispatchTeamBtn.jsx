const DispatchTeamBtn = ({ userOrgId, eventId }) => {
  async function dispatchTeam() {
    try {
      const res = await fetch(`/api/mongo/event/id/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dibsByOrgId: userOrgId,
          status: STATUS[1],
        }),
      });
      if (res.status === 200) {
        console.log("Successfully dispatched team");
      } else {
        throw new Error("Failed to dispatch team");
      }
    } catch (err) {
      console.log("Failed to dispatch team");
    }
  }
  return (
    <button onClick={dispatchTeam} className="btn btn-primary">
      Dispatch Team
    </button>
  );
};

export default DispatchTeamBtn;

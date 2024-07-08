import React from "react";

function Dashboard() {
  const token = localStorage.getItem("token");
  return (
    <React.Fragment>
      <h1>Growdev</h1>
      <p>{token}</p>
    </React.Fragment>
  );
}

export default Dashboard;

import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";

function Dashboard() {
  const token = localStorage.getItem("token");
  const { authenticated, logout } = useContext(Context);

  console.log("Situação do usuário " + authenticated);

  return (
    <React.Fragment>
      <h1>DASH</h1>
      <p>{token}</p>
      <button type='button' onClick={logout}>
        Sair
      </button>
    </React.Fragment>
  );
}

export default Dashboard;

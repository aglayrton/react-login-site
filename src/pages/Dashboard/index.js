import React, { useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";

function Dashboard() {
  const token = localStorage.getItem("token");
  const { authenticated, logout, userRole } = useContext(Context);

  // Utilize useEffect para monitorar mudanças em authenticated e userRole
  useEffect(() => {
    console.log("Situação do usuário: " + authenticated);
    console.log("Papel do usuário: " + userRole);
  }, [authenticated, userRole]);

  return (
    <React.Fragment>
      <h1>DASH</h1>
      <p>{token}</p>
      <p>{userRole}</p>
      <button type='button' onClick={logout}>
        Sair
      </button>
    </React.Fragment>
  );
}

export default Dashboard;

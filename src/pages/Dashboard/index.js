import React, { useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("token");
  const { authenticated, logout, userRole } = useContext(Context);

  // useEffect para monitorar mudanças em authenticated e userRole
  useEffect(() => {
    console.log("Situação do usuário:" + authenticated);
    console.log("Papel do usuário: " + userRole);
  }, [userRole]);

  return (
    <React.Fragment>
      <h1>DASH</h1>
      <p>{token}</p>
      <p>{userRole}</p>
      {userRole === "administrador" && (
        <React.Fragment>
          <Link to={"/usuarios"}>Usuários</Link>
          <br />
          <Link to={"/add"}>Adicionar Usuário</Link>
        </React.Fragment>
        
      )}
      <button type='button' onClick={logout}>
        Sair
      </button>
    </React.Fragment>
  );
}

export default Dashboard;

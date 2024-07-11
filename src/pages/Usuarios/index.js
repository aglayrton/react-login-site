import { useEffect, useState } from "react";
import { api } from "../../config/configApi";
import { Link, useLocation } from "react-router-dom";

export function Usuarios() {
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ erro: "", mensagem: "" });

  const getUsers = async () => {
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await api
      .get("/usuario", headers)
      .then((response) => {
        console.log(response.data.users);
        setUsers(response.data.users);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            erro: "erro",
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            erro: "erro",
            mensagem: "Tente mais tarde",
          });
        }
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {status && status.type === "success" && <p>{state.mensagem}</p>}
      {state && state.type === "success" && <p>{state.mensagem}</p>}
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.status}</p>
              <Link to={"/visualizar/" + user.id}>
                <button type='button'>visualizar</button>
              </Link>
              <Link to={"/editar/" + user.id}>
                <button type='button'>Editar</button>
              </Link>
              <hr />
            </div>
          );
        })}
      </div>
      <Link to={"/dashboard"}>Voltar</Link>
    </>
  );
}

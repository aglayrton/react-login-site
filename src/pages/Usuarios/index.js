import { useEffect, useState } from "react";
import { api } from "../../config/configApi";
import { Link } from "react-router-dom";

export function Usuarios() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ erro: "", mensagem: "" });

  const getUsers = async () => {
    const headers = {
      headers: {
        Authorization: "Bearen " + localStorage.getItem("token"),
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
      {status.erro === "erro" ? <p>{status.mensagem} </p> : ""}
      <p>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.status}</p>
              <hr />
            </div>
          );
        })}
      </p>
      <Link to={"/dashboard"}>Voltar</Link>
    </>
  );
}

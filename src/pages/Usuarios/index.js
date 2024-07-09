import { useEffect, useState } from "react";
import { api } from "../../config/configApi";
import { Link } from "react-router-dom";

export function Usuarios() {
  const [users, setUsers] = useState([]);

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
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
   <>
    <h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.status}</p>
          </div>
        );
      })}
    </h1>
    <Link to={"/dashboard"}>Voltar</Link>
   </>
  );
}

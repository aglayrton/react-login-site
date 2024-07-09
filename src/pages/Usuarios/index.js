import { useEffect, useState } from "react";
import { api } from "../../config/configApi";

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
  );
}

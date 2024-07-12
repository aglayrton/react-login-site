import { useEffect, useState } from "react";
import { api } from "../../config/configApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Usuarios() {
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ erro: "", mensagem: "" });

  const headers = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const getUsers = async () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (state && state.type === "success") {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer); // Limpar o timeout se o componente desmontar
    }
  }, [state, location.pathname, navigate]);

  const apagar = async (id) => {
    await api
      .delete("/usuario/" + id, headers)
      .then((response) => {
        console.log(response.data);
        getUsers();
      })
      .catch((err) => {
        if (err.response) {
          setStatus({ erro: "erro", mensagem: "Errado" });
        } else {
          setStatus({
            erro: "erro",
            mensagem: "Tente mais tarde",
          });
        }
      });
  };

  const desativar = async (id) => {
    await api
      .delete("/desativar/" + id, headers)
      .then((response) => {
        console.log(response);
        setStatus({
          erro: response.data.erro,
          mensagem: response.data.mensagem,
        });
      })
      .catch((err) => {});
  };

  return (
    <>
      {status && status.erro === false && <p>{status.mensagem}</p>}
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
              <button onClick={() => apagar(user.id)}>Deletar</button>
              <button onClick={() => desativar(user.id)}>Destivar</button>
              <hr />
            </div>
          );
        })}
      </div>
      <Link to={"/dashboard"}>Voltar</Link>
    </>
  );
}

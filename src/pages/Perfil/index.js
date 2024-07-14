import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/configApi";

export default function Perfil() {
  const [data, setData] = useState({ name: "" });
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await api
        .get("/perfil", { headers })
        .then((response) => {
          if (response.data.user) {
            console.log(response.data.user);
            setData({
              name: response.data.user.name,
            });
          } else {
            setStatus({
              type: "error",
              mensagem: "erro, perfil não encontrado",
            });
          }
        })
        .catch((err) => {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <Link to={"/usuarios"}>Listar Usuários</Link>
      <br />
      <Link to={"/dashboard"}>Dashboard</Link>
      {status && <p>{status.mensagem}</p>}
      <h1>Detalhe do Perfil</h1>
      {status.type === "error" ? <p>{status.mensagem}</p> : ""}
      {data.name ? <span>{data.name}</span> : ""}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/configApi";

export default function Perfil() {
  const [data, setData] = useState({
    name: "",
    foto: "",
    enderecoDaImagem: "",
  });
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
              foto: response.data.user.foto,
              enderecoDaImagem: response.data.imagemEndereco,
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

  useEffect(() => {
    console.log(data); // Isso vai mostrar o estado atualizado do data
  }, [data]);

  return (
    <div>
      <Link to={"/usuarios"}>Listar Usuários</Link>
      <br />
      <Link to={"/dashboard"}>Dashboard</Link>
      {status && <p>{status.mensagem}</p>}
      <h1>Detalhe do Perfil</h1>
      <Link to={"/perfil-edit"}>Editar Meu Perfil</Link>
      <br />
      <Link to={"/perfil-edit-foto"}>Editar Minha Foto</Link>
      {status.type === "error" ? <p>{status.mensagem}</p> : ""}
      {data.name ? <span>{data.name}</span> : ""}
      {data.foto ? (
        <img
          src={data.enderecoDaImagem + data.foto}
          alt='Foto-de-Perfil'
          style={{ width: 100, height: 100 }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

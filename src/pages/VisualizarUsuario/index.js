import { useEffect, useState } from "react";
import { servDelete } from "../../services/servDelete";
import { api } from "../../config/configApi";
import { Link, useParams } from "react-router-dom";

export default function VisualizarUsuario() {
  const { id } = useParams(); // Use useParams para obter o id da URL
  console.log(id);
  const [status, setStatus] = useState({ erro: "", mensagem: "" });
  const [usuario, setUsuario] = useState({
    id: "",
    name: "",
    email: "",
  });

  const getUser = async () => {
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await api
      .get("/usuario/" + id, headers)
      .then((response) => {
        console.log(response.data.users);
        setUsuario(response.data.users);
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
    getUser();
  }, []);

  const desativar = async (id) => {
    const response = await servDelete(id);
    console.log(response);
    if (response) {
      setStatus({
        erro: false,
        mensagem: response.mensagem,
      });
    } else {
      setStatus({
        erro: false,
        mensagem: "Erro ao desativar, tente mais tarde ",
      });
    }
  };

  return (
    <div>
      <Link to={"/usuarios"}>Listar Usuários</Link>
      <br />
      <Link to={"/dashboard"}>Dashboard</Link>
      {status && <p>{status.mensagem}</p>}
      <h1>Detalhe do usuário</h1>
      {usuario ? (
        <div>
          <p>{usuario.name}</p>
          <button onClick={() => desativar(usuario.id)}>Desativar</button>
          {"|"}
          <Link to={"/editar/" + usuario.id}>
            <button type='button'>Editar</button>
          </Link>
        </div>
      ) : (
        <p>Usuário {id} não encontrado</p>
      )}
    </div>
  );
}

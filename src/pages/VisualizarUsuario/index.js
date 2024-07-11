import { useEffect, useState } from "react";
import { api } from "../../config/configApi";
import { useParams } from "react-router-dom";

export default function VisualizarUsuario(props) {
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
  }, [id]);

  return (
    <div>
      <h1>Detalhe do usuário</h1>
      {usuario && <p>{usuario.name}</p>}
    </div>
  );
}

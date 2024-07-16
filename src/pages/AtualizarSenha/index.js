import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/configApi";

export default function AtualizarSenha() {
  const { key } = useParams();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const validarKey = async () => {
      const headers = {
        "Content-type": "application/json",
      };
      await api
        .post("/validar-key/" + key, { headers })
        .then((response) => {
          setStatus({
            type: response.data.erro,
            mensagem: response.data.mensagem,
          });
        })
        .catch((err) => {
          if (err.response) {
            setStatus({
              type: err.response.data.erro,
              mensagem: err.response.data.mensagem,
            });
          }
        });
    };

    validarKey();
    console.log("Key from URL:", key);
  }, [key]);

  return (
    <>
      <h1>Atualizar Senha: {key}</h1>
    </>
  );
}

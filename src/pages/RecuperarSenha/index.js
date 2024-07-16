import { useState } from "react";
import { api } from "../../config/configApi";
import { useNavigate } from "react-router-dom";

export const RecuperarSenha = () => {
  const [email, setEmail] = useState({
    email: "",
    url: "http://localhost:3000/atualizar-senha/",
  });
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false,
  });
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const recuperar = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    const headers = {
      "Content-Type": "application/json",
    };

    await api
      .post("/recuperar-senha", email, { headers })
      .then((response) => {
        console.log(response);
        setStatus({
          type: response.data.erro,
          mensagem: response.data.mensagem,
          loading: false,
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setStatus({
            type: error.response.data.erro,
            mensagem: error.response.data.mensagem,
            loading: false,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Tente mais tarde",
            loading: false,
          });
        }
      });
  };

  return (
    <div>
      <h1>Recuperar Senha</h1>
      <form onSubmit={recuperar}>
        <input
          type='email'
          name='email'
          placeholder='Digite seu email para recuperação'
          onChange={handleEmail}
        />
        {status.loading ? (
          <button type='submit' disabled>
            Enviando...
          </button>
        ) : (
          <button type='submit'>Enviar</button>
        )}
      </form>
    </div>
  );
};

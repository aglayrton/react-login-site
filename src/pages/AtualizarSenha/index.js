import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/configApi";

export default function AtualizarSenha() {
  const { key } = useParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    type: false,
    mensagem: "",
  });

  const editarSenha = async (e) => {
    e.preventDefault();
    console.log(password);
    const headers = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await api
      .put("/atualizar-senha/" + key, { password }, headers)
      .then((response) => {
        setStatus({
          type: true,
          mensagem: response.data.mensagem,
        });
        console.log(response.data);
      })
      .catch((err) => {
        setStatus({
          type: err.response.data.error,
          mensagem: err.response.data.mensagem,
        });
      });
  };

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
      <form onSubmit={editarSenha}>
        <input
          type='password'
          name='senha'
          placeholder='Digite sua nova senha'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Salvar</button>
      </form>
      <div>
        {status.type === true ? (
          <>
            <p>Senha atualizada</p>
            <Link to='/'>Clique aqui</Link>
          </>
        ) : (
          <>
            <p>Lembrou a senha</p>
            <Link to='/'>Clique aqui</Link>
          </>
        )}
      </div>
    </>
  );
}

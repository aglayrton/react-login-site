import { useContext, useState } from "react";

import { api } from "../../config/configApi";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false,
  });
  const navigate = useNavigate();

  const { authenticated, signIn } = useContext(Context);
  console.log("Situação do usuario " + authenticated);

  const valorInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    setStatus({ loading: true });
    const headers = {
      "Content-Type": "application/json",
    };
    await api
      .post("/login", user, { headers })
      .then((response) => {
        // console.log(response);
        setStatus({
          type: "sucess",
          mensagem: response.data.mensagem,
          loading: false,
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        signIn(true);
        return navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
            loading: false,
          });
          console.error("Erro na resposta:", err.response.data);
          console.error("Status:", err.response.status);
          console.error("Headers:", err.response);
        }
      });
  };

  return (
    <div>
      <p>{status.type === "sucess" ? status.mensagem : ""}</p>
      <p>{status.type === "error" ? status.mensagem : ""}</p>
      <p>{status.loading ? "Validando..." : ""}</p>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <label>Usuário</label>
        <input
          type='text'
          name='email'
          placeholder='Digite o e-mail'
          onChange={valorInput}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Digite sua senha'
          onChange={valorInput}
        />
        <br />
        {status.loading ? (
          <button type='submit' disabled>
            Acessando
          </button>
        ) : (
          <button type='submit'>Logar</button>
        )}
      </form>
    </div>
  );
};

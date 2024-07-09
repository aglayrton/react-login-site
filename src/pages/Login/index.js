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
  const { signIn } = useContext(Context);

  const valorInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await api.post("/login", user, { headers });
      setStatus({
        type: "success",
        mensagem: response.data.mensagem,
        loading: false,
      });
      await signIn(response.data.token);
      navigate("/dashboard");
    } catch (err) {
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
    }
  };

  return (
    <div>
      <p>{status.type === "success" ? status.mensagem : ""}</p>
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

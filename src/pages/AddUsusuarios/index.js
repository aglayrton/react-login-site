import { useState } from "react";
import { api } from "../../config/configApi";
import { Link, Navigate } from "react-router-dom";

export default function AddUsuarios() {
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const [user, setUser] = useState({
    status: "",
    name: "",
    email: "",
    password: "",
    nivel_acesso: "cliente",
  });

  const valueInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!valid()) return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    try {
      const response = await api.post("/usuario", user, { headers });
      setStatus({
        type: "success",
        mensagem: response.data.mensagem,
      });
      // Limpar os campos do formulário
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        mensagem: error.response.data.mensagem,
      });
      console.log("Erro:", error.response.data);
    }
  };

  function valid() {
    if (!user.name) return setStatus({
      type: "error",
      mensagem: "Necessário preencher o campo nome front",
    });
  }

  if (status.type === "success") {
    return (
      <Navigate
        to='/usuarios'
        state={{ type: "success", mensagem: status.mensagem }}
      />
    );
  }

  return (
    <>
      {status.type === "error" ? <p>{status.mensagem}</p> : ""}
      <Link to={"/usuarios"}>Listar Usuários</Link>
      <br />
      <Link to={"/dashboard"}>Dashboard</Link>
      <h1>Adicionar Usuários</h1>
      <form onSubmit={addUser}>
        <input type='hidden' name='status' value={0} />
        <input
          name='name'
          placeholder='Digite o nome do usuário'
          onChange={valueInput}
          value={user.name}
        />
        <input
          name='email'
          placeholder='Digite o email usuário'
          onChange={valueInput}
          value={user.email}
        />
        <input
          name='password'
          placeholder='Digite a senha do usuário'
          onChange={valueInput}
          value={user.password}
        />
        <button type='submit'>Cadastrar</button>
      </form>
    </>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/configApi";

function EditarUsuario() {
  const { id } = useParams();
  console.log(id);

  const [usuario, setUsuario] = useState({
    id: "",
    name: "",
    email: "",
    status: "",
    nivel_acesso: "",
    senha: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/usuario/" + id, { headers });
      setUsuario({
        id: id,
        name: response.data.users.name || "",
        email: response.data.users.email || "",
        senha: "", // senha não deve ser retornada pelo backend
        status: response.data.users.status || "", // Campo status
        nivel_acesso: response.data.users.nivel_acesso || "", // Novo campo tipo
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/usuario", usuario, { headers });
      setStatus({
        type: "success",
        mensagem: "Usuário atualizado com sucesso!",
      });
    } catch (err) {
      setStatus({
        type: "error",
        mensagem: "Erro ao atualizar usuário!",
      });
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <h1>Editar</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='hidden'
          name='id'
          value={usuario.id || ""}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='name'
          value={usuario.name || ""}
          onChange={handleInputChange}
        />
        <input
          type='email'
          name='email'
          value={usuario.email || ""}
          onChange={handleInputChange}
        />
        <select
          name='status'
          value={usuario.status || ""}
          onChange={handleInputChange}
        >
          <option value=''>Selecione o status</option>
          <option value='1'>Ativo</option>
          <option value='0'>Inativo</option>
        </select>
        <div>
          <label>
            <input
              type='radio'
              name='nivel_acesso'
              value='administrador'
              checked={usuario.nivel_acesso === "administrador"}
              onChange={handleInputChange}
            />
            Administrador
          </label>
          <label>
            <input
              type='radio'
              name='nivel_acesso'
              value='cliente'
              checked={usuario.nivel_acesso === "cliente"}
              onChange={handleInputChange}
            />
            Cliente
          </label>
        </div>
        <input
          type='password'
          name='senha'
          value={usuario.senha || ""}
          onChange={handleInputChange}
        />
        <button type='submit'>Editar</button>
      </form>
      {status.type === "success" && <p>{status.mensagem}</p>}
      {status.type === "error" && <p>{status.mensagem}</p>}
    </React.Fragment>
  );
}

export default EditarUsuario;

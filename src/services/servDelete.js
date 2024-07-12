import { api } from "../config/configApi";

export const servDelete = async (id) => {
  console.log("desativar usuario " + id);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await api.delete("/desativar/" + id, { headers });
    return {
      type: "success",
      mensagem: response.data.mensagem,
    };
  } catch (err) {
    if (err.response) {
      return {
        type: "error",
        mensagem: err.response.data.mensagem,
      };
    } else {
      return {
        type: "error",
        mensagem: "Erro, tente mais tarde",
      };
    }
  }
};
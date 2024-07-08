import { createContext, useEffect, useState } from "react";
import { api } from "../config/configApi";

const Context = createContext();

//Criação do contexto com a autenticação
function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //validacao de acesso a rota
  const valUser = async () => {
    const valueToken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + valueToken,
      },
    };
    await api
      .get("/usuario", headers)
      .then((response) => {
        return true;
      })
      .catch(() => {
        setAuthenticated(false);
        return false;
      });
  };

  //Vou verificar se o usuario está logado ou não
  useEffect(() => {
    const getLogin = async () => {
      const token = localStorage.getItem("token");
      //se existe o token e se é valido entao o usuario é autenticado
      if (token && valUser()) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
      }
      //se deu certo acima, ele não precisa mais carregar
      setLoading(false);
    };

    getLogin();
  }, []);

  //aqui somente para apresentar se está carregando ou nao
  if (loading) {
    return <h1>Carregando</h1>;
  }

  async function signIn(sit) {
    setAuthenticated(sit);
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
  }

  return (
    //o value está sendo passado para todas as páginas
    <Context.Provider value={{ authenticated, signIn, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

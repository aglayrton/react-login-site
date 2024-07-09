import { createContext, useEffect, useState } from "react";
import { api } from "../config/configApi";
import { jwtDecode } from "jwt-decode";

const Context = createContext();

//Criação do contexto com a autenticação
function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

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
      .then(() => {
        return true;
      })
      .catch(() => {
        setAuthenticated(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
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
        const decodedToken = jwtDecode(token);
        setAuthenticated(true);
        setUserRole(decodedToken.nivel);
      }
      //se deu certo acima, ele não precisa mais carregar
      setLoading(false);
    };

    getLogin();
  }, [authenticated]);

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
    <Context.Provider value={{ authenticated, signIn, logout, userRole }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

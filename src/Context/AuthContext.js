import { createContext, useEffect, useState } from "react";
import { api } from "../config/configApi";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  //somente para dizer que está carregando
  const [loading, setLoading] = useState(true);

  //Vou verificar se o usuario está logado ou não
  useEffect(() => {
    //aguarde até finalizar a instrução
    const getLogin = async () => {
      const token = localStorage.getItem("token");
      //se existir o token, a api recebe o cabeçalho de autorização e seta que está autenticado
      if (token) {
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

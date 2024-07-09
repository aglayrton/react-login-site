import { createContext, useEffect, useState } from "react";
import { api } from "../config/configApi";
import { jwtDecode } from "jwt-decode";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Validar se o usuário está autenticado e o token é válido
  const valUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      await api.get("/usuario", headers);
      return true;
    } catch (error) {
      setAuthenticated(false);
      localStorage.removeItem("token");
      api.defaults.headers.Authorization = undefined;
      return false;
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        if (await valUser()) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const decodedToken = jwtDecode(token);
          setAuthenticated(true);
          setUserRole(decodedToken.nivel);
        }
      }
      setLoading(false);
    };

    checkUserAuthentication();
  }, []);

  if (loading) {
    return <h1>Carregando</h1>;
  }

  async function signIn(token) {
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.nivel);
    setAuthenticated(true);
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    setUserRole(null); // Resetar a role do usuário
  }

  return (
    <Context.Provider value={{ authenticated, signIn, logout, userRole }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

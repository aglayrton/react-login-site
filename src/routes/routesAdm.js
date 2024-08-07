import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { useContext } from "react";
import { Context } from "../Context/AuthContext";
import { Usuarios } from "../pages/Usuarios";
import AddUsuarios from "../pages/AddUsusuarios";
import VisualizarUsuario from "../pages/VisualizarUsuario";
import EditarUsuario from "../pages/EditUsuarios";
import Perfil from "../pages/Perfil";
import EditarPerfil from "../pages/EditarPerfil";
import { RecuperarSenha } from "../pages/RecuperarSenha";
import AtualizarSenha from "../pages/AtualizarSenha";
import EditarPerfilFoto from "../pages/EditarPerfilFoto";

function CustomRoute({ isPrivate, roles }) {
  const { authenticated, userRole } = useContext(Context);
  const location = useLocation();

  if (isPrivate && !authenticated) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to='/not-authorized' state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route
        element={
          <CustomRoute isPrivate={true} roles={["administrador", "cliente"]} />
        }
      >
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/perfil-edit' element={<EditarPerfil />} />
        <Route path='/perfil-edit-foto' element={<EditarPerfilFoto />} />
      </Route>
      <Route
        element={<CustomRoute isPrivate={true} roles={["administrador"]} />}
      >
        <Route path='/usuarios/*' element={<Usuarios />} />
        <Route path='/add' element={<AddUsuarios />} />
        <Route path='/visualizar/:id' element={<VisualizarUsuario />} />
        <Route path='/editar/:id' element={<EditarUsuario />} />
      </Route>
      <Route path='/' element={<Login />} />
      <Route path='/recuperar-senha' element={<RecuperarSenha />} />
      <Route path='/atualizar-senha/:key' element={<AtualizarSenha />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

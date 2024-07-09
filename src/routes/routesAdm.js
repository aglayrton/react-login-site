import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { useContext } from "react";
import { Context } from "../Context/AuthContext";
import { Usuarios } from "../pages/Usuarios";

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
      </Route>
      <Route element={<CustomRoute isPrivate={true} roles={["cliente"]} />}>
        <Route path='/usuarios/*' element={<Usuarios />} />
      </Route>
      <Route path='/' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

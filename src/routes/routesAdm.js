import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { useContext } from "react";
import { Context } from "../Context/AuthContext";
import { Usuarios } from "../pages/Usuarios";

function CustomRoute({ isPrivate }) {
  const { authenticated } = useContext(Context);
  const location = useLocation();

  if (isPrivate && !authenticated) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route element={<CustomRoute isPrivate={true} />}>
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/usuarios/*' element={<Usuarios />} />
      </Route>
      <Route path='/' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

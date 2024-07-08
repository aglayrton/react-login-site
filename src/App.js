import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./Context/AuthContext";
// Importando o componente Login

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

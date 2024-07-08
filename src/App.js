import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import RoutesAdm from "./routes/routesAdm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesAdm />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

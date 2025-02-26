import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css'
import Inicio from "./pages/inicio";
import Entrar from "./pages/entrar";
import Cadastrar from "./pages/cadastrar";
import Central from "./pages/central";
import { RotaProtegida } from "./components/RotaProtegida/rotaProtegida";
import PaginaNaoEncontrada from "./pages/paginaNaoEncontrada";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' element={ <PaginaNaoEncontrada /> } />
        <Route path="/" element={ <Navigate to={'/inicio'} /> } />
        <Route path="/inicio" element={ <Inicio/> } />
        <Route path="/entrar" element={ <Entrar /> } />
        <Route path="/cadastrar" element={ <Cadastrar /> } />
        <Route path="/central" element={ 
            <RotaProtegida>
              <Central />
            </RotaProtegida>
        } />
      </Routes>
    </Router>
)
}

export default App;

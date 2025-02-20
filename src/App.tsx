import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css'
import Inicio from "./pages/inicio";
import Entrar from "./pages/entrar";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' />
        <Route path="/" element={<Navigate to={'/inicio'}/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/entrar" element={<Entrar />}/>
        <Route path="/cadastrar" />
        <Route path="/mudar-senha" />
        <Route path="/central-de-personagens" />
      </Routes>
    </Router>
)
}

export default App

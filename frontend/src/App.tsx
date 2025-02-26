// Importa os componentes necessários do react-router-dom para gerenciar o roteamento na aplicação.
// Navigate: Permite redirecionar automaticamente para outra rota.
// Route: Define uma rota individual.
// BrowserRouter (renomeado como Router): Contêiner que habilita o roteamento baseado na URL.
// Routes: Agrupa e gerencia as rotas definidas.
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Importa o arquivo global de estilos.
import './index.css'

// Importa as páginas da aplicação.
import Inicio from "./pages/inicio"; // Página inicial da aplicação.
import Entrar from "./pages/entrar";  // Página de login.
import Cadastrar from "./pages/cadastrar"; // Página de cadastro de usuário.
import Central from "./pages/central"; // Página central (acessível apenas para usuários autenticados).

// Importa o componente de rota protegida que impede o acesso a determinadas rotas sem autenticação.
import { RotaProtegida } from "./components/RotaProtegida/rotaProtegida";

// Importa a página de "Página Não Encontrada" para rotas inexistentes.
import PaginaNaoEncontrada from "./pages/paginaNaoEncontrada";
import { useEffect } from "react";
import { VerificarToken } from "./components/VerificarToken/verificarToken";

// Função principal que define a estrutura de rotas da aplicação.
function App() {

  // Chama a função para verificar se o token é valido quando a pagina é renderizada.
  useEffect(() => {
    VerificarToken();
  }, []);

  return (
    // <Router>: habilita o roteamento baseado na URL.
    <Router>
      {/* <Routes>: agrupa todas as rotas definidas na aplicação. */}
      <Routes>
        {/* Renderiza a página de "Página Não Encontrada" para qualquer rota não definida. */}
        <Route path='*' element={ <PaginaNaoEncontrada /> } />
        
        {/* Rota raiz: Redireciona automaticamente de "/" para "/inicio". */}
        <Route path="/" element={ <Navigate to={'/inicio'} /> } />
        
        {/* Rota para a página inicial */}
        <Route path="/inicio" element={ <Inicio/> } />
        
        {/* Rota para a página de login */}
        <Route path="/entrar" element={ <Entrar /> } />
        
        {/* Rota para a página de cadastro */}
        <Route path="/cadastrar" element={ <Cadastrar /> } />
        
        {/* 
          Rota protegida para a página central: Apenas acessível se o usuário estiver autenticado.
          <RotaProtegida>: verifica a autenticação, caso esteja autenticado entao renderiza o componente <Central>. 
        */}
        <Route path="/central" element={ 
            <RotaProtegida>
              <Central />
            </RotaProtegida>
        } />
      </Routes>
    </Router>
  )
}

// Exporta o componente App como padrão para ser utilizado na renderização da aplicação.
export default App;

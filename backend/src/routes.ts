import { Router } from "express"; // Traz o Router do Express para definir as rotas da aplicação
import { authMiddleware } from "./middlewares/authMiddleware"; // Importa o middleware que verifica se o usuário está autenticado
import { alterarInfo, autentica, criarConta, getUsuario } from "./controller"; // Importa as funções que vão lidar com as operações de usuário

const routes = Router(); // Cria um novo objeto de rotas

// Chama a função autentica quando alguém envia um POST para a rota "/entrar".
routes.post('/entrar', autentica);
// Chama a funcao criarConta quando envia um POST para a rota "/cadastrar".
routes.post('/cadastrar', criarConta);

// Chama a função getUsuario quando alguém envia um GET para a rota "/central".
// Antes de chamar getUsuario, passa pelo authMiddleware para checar se o token é válido.
routes.get('/central', authMiddleware, getUsuario);

// Chama a função alterarInfo quando alguém envia um PUT para a rota "/central".
// Também usa o authMiddleware para garantir que o usuário esteja autenticado antes de alterar os dados.
routes.put('/central', authMiddleware, alterarInfo);

export { routes }; // Exporta as rotas para que possam ser usadas em outros lugares da aplicação

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express"); // Traz o Router do Express para definir as rotas da aplicação
const authMiddleware_1 = require("./middlewares/authMiddleware"); // Importa o middleware que verifica se o usuário está autenticado
const controller_1 = require("./controller"); // Importa as funções que vão lidar com as operações de usuário
const routes = (0, express_1.Router)(); // Cria um novo objeto de rotas
exports.routes = routes;
// Chama a função autentica quando alguém envia um POST para a rota "/entrar".
routes.post('/entrar', controller_1.autentica);
// Chama a funcao criarConta quando envia um POST para a rota "/cadastrar".
routes.post('/cadastrar', controller_1.criarConta);
// Chama a função getUsuario quando alguém envia um GET para a rota "/central".
// Antes de chamar getUsuario, passa pelo authMiddleware para checar se o token é válido.
routes.get('/central', authMiddleware_1.authMiddleware, controller_1.getUsuario);
// Chama a função alterarInfo quando alguém envia um PUT para a rota "/central".
// Também usa o authMiddleware para garantir que o usuário esteja autenticado antes de alterar os dados.
routes.put('/central', authMiddleware_1.authMiddleware, controller_1.alterarInfo);

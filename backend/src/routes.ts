import { Router } from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { alterarInfo, autentica, criarConta, getUsuario } from "./controller";

const routes = Router();

routes.post('/entrar', autentica);
routes.post('/cadastrar', criarConta);
routes.get('/central', authMiddleware, getUsuario);
routes.put('/central', authMiddleware, alterarInfo);

export { routes };
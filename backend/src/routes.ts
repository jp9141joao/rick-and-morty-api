import { Router } from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { autentica } from "./controller";

const routes = Router();

routes.post('/entrar', autentica);
routes.post('/cadastrar');
routes.post('/central-de-personagens', authMiddleware);

export { routes };
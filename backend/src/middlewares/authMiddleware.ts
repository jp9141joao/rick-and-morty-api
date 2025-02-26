// Traz as funções e tipos que vamos usar do Express, JWT e dotenv
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpResult } from '../models/http-result';

// Carrega as variáveis definidas no arquivo .env
dotenv.config();

// Pega a chave secreta do env.
const SECRET_KEY = process.env.SECRET_KEY;

// Se não existir uma SECRET_KEY, lanca um erro informando.
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não está definido no arquivo .env!");
}

// Esse middleware é para garantir que só usuários com token válido acessem determinada rota
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Pega o cabeçalho da request no qual contém o token passado pelo frontend.
    const authHeader = req.headers['authorization'];

    // Se não tiver o cabeçalho, mostra erro dizendo que o token não foi enviado.
    if (!authHeader) {
        throw new Error("Acesso negado, token não fornecido!");
    }

    // Se o token vem no formato "Bearer token", aqui pegamos só o token mesmo poe meio do split
    // que divide a string em um vetor de duas string, entao ele pega a primeira posicao desse vetor, que e o token.
    const token = authHeader.split(' ')[1];

    // Se depois de pegar não houver token, mostra erro de novo.
    if (!token) {
        throw new Error("Acesso negado, token não fornecido!");
    }

    try {
        // Verifica se o token é válido usando a chave secreta
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        // Se for válido, guarda os dados do usuário na requisição para usar depois
        (req as any).user = decoded;

        // Continua para o próximo passo ou rota
        next();
    } catch (error: any) {
        // Se algo der errado na verificação, retorna uma resposta de erro
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no authMiddleware"));
    }
}

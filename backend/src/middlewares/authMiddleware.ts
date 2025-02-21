import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpResult } from '../models/http-result';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não está definido no arquivo .env!");
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        throw new Error("Acesso negado, token não fornecido!");
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new Error("Acesso negado, token não fornecido!");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no authMiddleware"));
    }
}

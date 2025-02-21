import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { HttpResult } from "./models/http-result";
import { Login } from './request';
import { Utils } from './utils/utils';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const prisma = new PrismaClient();

export const autentica = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            email,
            senha
        } = req.body as Login;

        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY não está definido no arquivo .env!");
        }

        if (!Utils.ValorExiste(email) || !Utils.ValidaEmail(email)) {
            res.status(404).json(HttpResult.Fail("Erro: E-mail Inválido!"));
            return;
        } 

        if (!Utils.ValorExiste(senha) || !Utils.ValidaSenha(senha)) {
            res.status(404).json(HttpResult.Fail("Erro: Senha Inválida!"));
            return;
        }

        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                email: email,
            }
        });

        if (!usuario) {
            res.status(400).json(HttpResult.Fail("E-mail ou senha Inválidos"));
            return;
        }

        const validaSenha = await bcrypt.compare(senha, usuario.senha);

        if (!validaSenha) {
            res.status(400).json(HttpResult.Fail("E-mail ou senha Inválidos"));
            return; 
        }

        const id = usuario.id.toString();

        const token = jwt.sign(
            { id, email },
            SECRET_KEY,
            { expiresIn: '1h'}
        );

        res.status(200).json(HttpResult.Success(token));
    } catch (error: any) {
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no Autentica"));
        console.error(error);
    }
}
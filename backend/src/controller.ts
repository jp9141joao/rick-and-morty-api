import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { HttpResult } from "./models/http-result";
import { AlterarInfo, CriarConta, Login } from './request';
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

        if (!Utils.ValorExiste(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail não Informado!"));
            return;
        } else if (email.length > 255 || !Utils.EmailValido(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
            return;
        } 

        if (!Utils.ValorExiste(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
            return;
        } else if (senha.length > 255 || !Utils.SenhaValida(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha com Formato Inválido!"));
            return;
        }

        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                email: email,
            }
        });

        if (!usuario) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return;
        }

        const SenhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!SenhaValida) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return; 
        }

        const id = usuario.id.toString();

        const token = jwt.sign(
            { id },
            SECRET_KEY,
            { expiresIn: '1h'}
        );

        res.status(200).json(HttpResult.Success(token));
    } catch (erro: any) {
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no autentica."));
        console.error(erro);
    }
}

export const criarConta = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            nome,
            email,
            senha
        } = req.body as CriarConta;

        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;
        }

        if (!Utils.ValorExiste(nome)) {
            res.status(200).json(HttpResult.Fail("Erro: Nome Completo não Informado!"));
            return;
        } else if (!Utils.NomeValido(nome)) {
            res.status(200).json(HttpResult.Fail("Erro: Nome Completo com Formato Inválido!"));
            return;
        } else if (nome.length > 30) {
            res.status(200).json(HttpResult.Fail("Erro: Nome Completo Muito Grande!"));
            return;
        }

        if (!Utils.ValorExiste(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail não Informado!"));
            return;
        } else if (!Utils.EmailValido(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
            return;
        } else if (email.length > 255) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail Muito Grande!"));
            return;
        }

        if (!Utils.ValorExiste(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
            return;
        } else if (!Utils.SenhaValida(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha com Formato Inválido!"));
            return;
        } else if (senha.length > 255) {
            res.status(200).json(HttpResult.Fail("Erro: Senha Muito Grande!"));
            return;
        }

        const emailExiste = (await prisma.tb_usuario.count({
            where: {
                email: email
            }
        })) > 0 ? true : false;


        if (emailExiste) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail Já Cadastrado!"));
            return;
        }

        const nomeFormatado = nome.toLowerCase().split(" ").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        await prisma.tb_usuario.create({
            data: {
                nome: nomeFormatado,
                email: email,
                senha: senhaCriptografada
            }
        });

        res.status(200).json(HttpResult.Success("Conta criada com sucesso!"));
    } catch (erro: any) {
        console.error(erro);
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta."));
        return;
    }
}

export const getUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;        
        }

        if (!token) {
            res.status(401).json(HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }

        const decodificado = jwt.verify(token, SECRET_KEY) as { id: string };
        const id = decodificado.id;

        if (!id) {
            res.status(400).json(HttpResult.Fail("Erro: Token fornecido é inválido!"));
            return;  
        }

        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                id: BigInt(id)
            }
        });

        if (!usuario) {
            throw new Error("Erro: Usuario não existe!");
        }

        const usuarioFormatado = {
            ...usuario,
            id: usuario.toString(),
        }

        res.status(200).json(HttpResult.Success(usuarioFormatado));
    } catch (erro: any) {
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
}

export const alterarInfo = async (req: Request, res: Response) => {
    try {
        const {
            nome,
            email,
            senha,
            novaSenha,
            operacao,
        } = req.body as AlterarInfo;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;        
        }

        if (!token) {
            res.status(401).json(HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }

        const decodificado = jwt.verify(token, SECRET_KEY) as { id: string };
        const id = decodificado.id;

        if (!id) {
            res.status(400).json(HttpResult.Fail("Erro: Token fornecido é inválido!"));
            return;  
        }

        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                id: BigInt(id),
            }
        });

        if (!usuario) {
            res.status(404).json(HttpResult.Fail("Erro: Usuario não existe!"));
            return; 
        }

        let novoUsuario = usuario;

        if (operacao == "Info") {

            if (!nome) {
                res.status(200).json(HttpResult.Fail("Erro: Nome Completo não Informado!"));
                return;
            }

            if (!email) {
                res.status(200).json(HttpResult.Fail("Erro: E-mail não Informado!"));
                return;
            }
            
            if (nome != usuario.nome) {
                if (!Utils.NomeValido(nome)) {
                    res.status(200).json(HttpResult.Fail("Erro: Nome Completo com Formato Inválido!"));
                    return;
                } else if (nome.length > 30) {
                    res.status(200).json(HttpResult.Fail("Erro: Nome Completo Muito Grande!"));
                    return;
                }
    
                novoUsuario = { ...novoUsuario, nome: nome };
            }
    
            if (email && email != usuario.email) {
                if (!Utils.EmailValido(email)) {
                    res.status(200).json(HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
                    return;
                } else if (email.length > 255) {
                    res.status(200).json(HttpResult.Fail("Erro: E-mail Muito Grande!"));
                    return;
                }

                const emailExiste = await prisma.tb_usuario.count({
                    where: {
                        email: email
                    }
                }) > 0 ? true : false;
    
                if (emailExiste) {
                    res.status(200).json(HttpResult.Fail("Erro: E-mail Já Cadastrado!"));
                    return; 
                }
    
                novoUsuario = { ...novoUsuario, email: email };
            }
        } else if (operacao == "Senha") {

            if (!senha) {
                res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
                return;
            }

            if (!novaSenha) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha não Informada!"));
                return;
            }

            if (!Utils.ValorExiste(senha)) {
                res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
                return;
            } else if (senha.length > 255 || !Utils.SenhaValida(senha)) {
                res.status(200).json(HttpResult.Fail("Erro: Senha com Formato Inválido!"));
                return;
            }

            const validarSenha = await bcrypt.compare(senha, usuario.senha);

            if (!validarSenha) {
                res.status(200).json(HttpResult.Fail("Erro: Senha Incorreta!"));
                return;
            }
    
            if (!Utils.SenhaValida(novaSenha)) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha com Formato Inválido!"));
                return;
            } else if (novaSenha.length > 255) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha Muito Grande!"));
                return;
            }

            novoUsuario = { ...novoUsuario, senha: novaSenha };
        }

        const usuarioAtualizado = await prisma.tb_usuario.update({
            where: {
                id: BigInt(id),
            },
            data: novoUsuario
        });

        const usuarioFormatado = {
            ...usuarioAtualizado,
            id: usuarioAtualizado.toString(),
        };

        res.status(200).json(HttpResult.Success(usuarioFormatado));
    } catch (erro: any) {
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
}
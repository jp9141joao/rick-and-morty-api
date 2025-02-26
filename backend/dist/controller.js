"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterarInfo = exports.getUsuario = exports.criarConta = exports.autentica = void 0;
const client_1 = require("@prisma/client");
const http_result_1 = require("./models/http-result");
const utils_1 = require("./utils/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const prisma = new client_1.PrismaClient();
const autentica = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY não está definido no arquivo .env!");
        }
        if (!utils_1.Utils.ValorExiste(email)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail não Informado!"));
            return;
        }
        else if (email.length > 255 || !utils_1.Utils.EmailValido(email)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
            return;
        }
        if (!utils_1.Utils.ValorExiste(senha)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha não Informada!"));
            return;
        }
        else if (senha.length > 255 || !utils_1.Utils.SenhaValida(senha)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha com Formato Inválido!"));
            return;
        }
        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                email: email,
            }
        });
        if (!usuario) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return;
        }
        const SenhaValida = await bcryptjs_1.default.compare(senha, usuario.senha);
        if (!SenhaValida) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return;
        }
        const id = usuario.id.toString();
        const token = jsonwebtoken_1.default.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json(http_result_1.HttpResult.Success(token));
    }
    catch (erro) {
        res.status(400).json(http_result_1.HttpResult.Fail("Ocorreu um erro inesperado no autentica."));
        console.error(erro);
    }
};
exports.autentica = autentica;
const criarConta = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!SECRET_KEY) {
            res.status(400).json(http_result_1.HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;
        }
        if (!utils_1.Utils.ValorExiste(nome)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo não Informado!"));
            return;
        }
        else if (!utils_1.Utils.NomeValido(nome)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo com Formato Inválido!"));
            return;
        }
        else if (nome.length > 30) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo Muito Grande!"));
            return;
        }
        if (!utils_1.Utils.ValorExiste(email)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail não Informado!"));
            return;
        }
        else if (!utils_1.Utils.EmailValido(email)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
            return;
        }
        else if (email.length > 255) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail Muito Grande!"));
            return;
        }
        if (!utils_1.Utils.ValorExiste(senha)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha não Informada!"));
            return;
        }
        else if (!utils_1.Utils.SenhaValida(senha)) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha com Formato Inválido!"));
            return;
        }
        else if (senha.length > 255) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha Muito Grande!"));
            return;
        }
        const emailExiste = (await prisma.tb_usuario.count({
            where: {
                email: email
            }
        })) > 0 ? true : false;
        if (emailExiste) {
            res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail Já Cadastrado!"));
            return;
        }
        const senhaCriptografada = await bcryptjs_1.default.hash(senha, 10);
        await prisma.tb_usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaCriptografada
            }
        });
        res.status(200).json(http_result_1.HttpResult.Success("Conta criada com sucesso!"));
    }
    catch (erro) {
        console.error(erro);
        res.status(400).json(http_result_1.HttpResult.Fail("Ocorreu um erro inesperado no criarConta."));
        return;
    }
};
exports.criarConta = criarConta;
const getUsuario = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!SECRET_KEY) {
            res.status(400).json(http_result_1.HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;
        }
        if (!token) {
            res.status(401).json(http_result_1.HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }
        const decodificado = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const id = decodificado.id;
        if (!id) {
            res.status(400).json(http_result_1.HttpResult.Fail("Erro: Token fornecido é inválido!"));
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
        };
        res.status(200).json(http_result_1.HttpResult.Success(usuarioFormatado));
    }
    catch (erro) {
        res.status(400).json(http_result_1.HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
};
exports.getUsuario = getUsuario;
const alterarInfo = async (req, res) => {
    try {
        const { nome, email, senha, novaSenha, operacao, } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!SECRET_KEY) {
            res.status(400).json(http_result_1.HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;
        }
        if (!token) {
            res.status(401).json(http_result_1.HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }
        const decodificado = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const id = decodificado.id;
        if (!id) {
            res.status(400).json(http_result_1.HttpResult.Fail("Erro: Token fornecido é inválido!"));
            return;
        }
        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                id: BigInt(id),
            }
        });
        if (!usuario) {
            res.status(404).json(http_result_1.HttpResult.Fail("Erro: Usuario não existe!"));
            return;
        }
        let novoUsuario = usuario;
        if (operacao == "Info") {
            if (!nome) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo não Informado!"));
                return;
            }
            if (!email) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail não Informado!"));
                return;
            }
            if (nome != usuario.nome) {
                if (!utils_1.Utils.NomeValido(nome)) {
                    res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo com Formato Inválido!"));
                    return;
                }
                else if (nome.length > 30) {
                    res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nome Completo Muito Grande!"));
                    return;
                }
                novoUsuario = { ...novoUsuario, nome: nome };
            }
            if (email && email != usuario.email) {
                if (!utils_1.Utils.EmailValido(email)) {
                    res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
                    return;
                }
                else if (email.length > 255) {
                    res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail Muito Grande!"));
                    return;
                }
                const emailExiste = await prisma.tb_usuario.count({
                    where: {
                        email: email
                    }
                }) > 0 ? true : false;
                if (emailExiste) {
                    res.status(200).json(http_result_1.HttpResult.Fail("Erro: E-mail Já Cadastrado!"));
                    return;
                }
                novoUsuario = { ...novoUsuario, email: email };
            }
        }
        if (operacao == "Senha") {
            if (!senha) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha não Informada!"));
                return; //
            }
            if (!novaSenha) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nova Senha não Informada!"));
                return; //
            }
            if (senha.length > 255 || !utils_1.Utils.SenhaValida(senha)) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha com Formato Inválido!"));
                return; //
            }
            const validarSenha = await bcryptjs_1.default.compare(senha, usuario.senha);
            if (!validarSenha) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Senha Incorreta!"));
                return; //
            }
            if (!utils_1.Utils.SenhaValida(novaSenha)) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nova Senha com Formato Inválido!"));
                return; //
            }
            else if (novaSenha.length > 255) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nova Senha Muito Grande!"));
                return;
            }
            const validarNovaSenha = await bcryptjs_1.default.compare(novaSenha, usuario.senha);
            if (validarNovaSenha) {
                res.status(200).json(http_result_1.HttpResult.Fail("Erro: Nova Senha Igual a Antiga!"));
                return;
            }
            const novaSenhaCriptografada = await bcryptjs_1.default.hash(senha, 10);
            novoUsuario = { ...novoUsuario, senha: novaSenhaCriptografada };
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
        res.status(200).json(http_result_1.HttpResult.Success(usuarioFormatado));
    }
    catch (erro) {
        res.status(400).json(http_result_1.HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
};
exports.alterarInfo = alterarInfo;

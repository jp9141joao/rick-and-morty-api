// Importa as dependências necessárias para a API

import { Request, Response } from 'express'; // Tipos do Express para gerenciar requisições e respostas HTTP.
import { PrismaClient } from "@prisma/client"; // Cliente do Prisma para interação com o banco de dados.
import { HttpResult } from "./models/http-result"; // Modelo para padronizar as respostas HTTP (sucesso ou erro).
import { AlterarInfo, CriarConta, Login } from './request'; // Tipos customizados para as requisições de conta.
import { Utils } from './utils/utils'; // Funções utilitárias para validações (e.g., validação de email, senha, nome).
import dotenv from 'dotenv'; // Carrega variáveis de ambiente do arquivo .env.
import bcrypt from 'bcryptjs'; // Biblioteca para criptografar e comparar senhas.
import jwt from 'jsonwebtoken'; // Biblioteca para geração e verificação de tokens JWT.

dotenv.config(); // Carrega as variáveis de ambiente definidas no arquivo .env.
const SECRET_KEY = process.env.SECRET_KEY; // Chave secreta utilizada para assinatura dos tokens JWT.
const prisma = new PrismaClient(); // Cria uma instância do PrismaClient para comunicação com o banco de dados.


// Função para autenticar o usuário utilizando email e senha.
export const autentica = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extrai email e senha do corpo da requisição, tipados como Login.
        const { email, senha } = req.body as Login;

        // Verifica se a SECRET_KEY está definida caso não esteja lança um erro.
        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY não está definido no arquivo .env!");
        }

        // Valida se o email foi informado e se possui formato válido e tamanho adequado.
        if (!Utils.ValorExiste(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail não Informado!"));
            return;
        } else if (email.length > 255 || !Utils.EmailValido(email)) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail com Formato Inválido!"));
            return;
        } 

        // Valida se a senha foi informada e se atende aos critérios de formato e tamanho.
        if (!Utils.ValorExiste(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
            return;
        } else if (senha.length > 255 || !Utils.SenhaValida(senha)) {
            res.status(200).json(HttpResult.Fail("Erro: Senha com Formato Inválido!"));
            return;
        }

        // Procura um usuário no banco de dados que possua o email informado.
        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                email: email,
            }
        });

        // Se nenhum usuário for encontrado, retorna erro de credenciais incorretas.
        if (!usuario) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return;
        }

        // Compara a senha informada com a senha armazenada no banco.
        const SenhaValida = await bcrypt.compare(senha, usuario.senha);

        // Se a senha não corresponder, retorna erro de credenciais incorretas.
        if (!SenhaValida) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail ou Senha Incorretos!"));
            return; 
        }

        // Converte o id do usuário para string para ser utilizado no token.
        const id = usuario.id.toString();

        // Gera um token JWT com o id do usuário e expiração de 1 hora.
        const token = jwt.sign(
            { id },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Retorna o token gerado como resposta de sucesso.
        res.status(200).json(HttpResult.Success(token));
    } catch (erro: any) {
        // Em caso de erro, irá retorna resposta com status 400 e mensagem de erro
        // além de imprimir no terminal o erro ocorrido.
        console.error(erro);
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no autentica."));
        console.error(erro);
    }
}


// Função para criar uma nova conta de usuário.
export const criarConta = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extrai nome, email e senha do corpo da requisição, tipados como modelo CriarConta.
        const { nome, email, senha } = req.body as CriarConta;

        // Verifica se a SECRET_KEY está definida caso não esteja irá retorna um erro.
        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;
        }

        // Valida se o nome foi informado, se está no formato correto e se não ultrapassa o tamanho máximo permitido.
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

        // Valida se o email foi informado, se está no formato correto e se não ultrapassa o tamanho máximo permitido.
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

        // Valida se a senha foi informada, se atende ao formato esperado e se não ultrapassa o tamanho máximo permitido.
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

        // Verifica se ja existe um usuário cadastrado com o mesmo email.
        const emailExiste = (await prisma.tb_usuario.count({
            where: {
                email: email
            }
        })) > 0 ? true : false;

        // Se o email já estiver cadastrado, retorna erro.
        if (emailExiste) {
            res.status(200).json(HttpResult.Fail("Erro: E-mail Já Cadastrado!"));
            return;
        }

        // Criptografa a senha utilizando bcrypt com 10 salt rounds.
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        // Cria um novo usuário no banco de dados com os dados informados.
        await prisma.tb_usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaCriptografada
            }
        });

        // Retorna uma resposta de sucesso indicando que a conta foi criada.
        res.status(200).json(HttpResult.Success("Conta criada com sucesso!"));
    } catch (erro: any) {
        // Em caso de erro, irá retorna resposta com status 400 e mensagem de erro
        // além de imprimir no terminal o erro ocorrido.
        console.error(erro);
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta."));
        return;
    }
}


// Função para obter os dados do usuário autenticado a partir do token JWT.
export const getUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtém o token de autorização dos headers da requisição.
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Verifica se a SECRET_KEY esta definida.
        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;        
        }

        // Verifica se o token foi fornecido e retorna um erro de autorização caso não esteja.
        if (!token) {
            res.status(401).json(HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }

        // Verifica e decodifica o token JWT utilizando a SECRET_KEY.
        const decodificado = jwt.verify(token, SECRET_KEY) as { id: string };
        const id = decodificado.id;

        // Se o token não contiver um id em sua estrutura retornará um erro.
        if (!id) {
            res.status(400).json(HttpResult.Fail("Erro: Token fornecido é inválido!"));
            return;  
        }

        // Procura no banco de dados um usuário que possua o id extraído do token.
        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                id: BigInt(id)
            }
        });

        // Se nenhum usuário for encontrado, lança um erro.
        if (!usuario) {
            throw new Error("Erro: Usuario não existe!");
        }

        // Formata os dados do usuário, convertendo o id para string, pois se trata de um bigint,
        // caso contrario, ao enviar os dados para o frontend, daria errod e stringfy.
        const usuarioFormatado = {
            ...usuario,
            id: usuario.toString(),
        }

        // Retorna os dados do usuário em resposta de sucesso.
        res.status(200).json(HttpResult.Success(usuarioFormatado));
    } catch (erro: any) {
        // Em caso de erro, irá retorna resposta com status 400 e mensagem de erro
        // além de imprimir no terminal o erro ocorrido. 
        console.error(erro);       
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
}


// Função para alterar as informações do usuário (dados pessoais ou senha).
export const alterarInfo = async (req: Request, res: Response) => {
    try {
        // Extrai os dados da requisição para alteração: nome, email, senha, novaSenha e o tipo de operação, tipados como AlterarInfo.
        const { nome, email, senha, novaSenha, operacao } = req.body as AlterarInfo;
        // Obtém o token de autorização dos headers.
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Verifica se a SECRET_KEY está definida.
        if (!SECRET_KEY) {
            res.status(400).json(HttpResult.Fail("SECRET_KEY não está definido no arquivo .env!"));
            return;        
        }

        // Verifica se o token foi fornecido; se não, retorna erro de autorização.
        if (!token) {
            res.status(401).json(HttpResult.Fail("Erro: Token não está definido!"));
            return;
        }

        // Decodifica o token JWT para extrair o id do usuário.
        const decodificado = jwt.verify(token, SECRET_KEY) as { id: string };
        const id = decodificado.id;

        // Se o token não contiver um id válido, retorna erro.
        if (!id) {
            res.status(400).json(HttpResult.Fail("Erro: Token fornecido é inválido!"));
            return;  
        }

        // Procura o usuário no banco de dados utilizando o id extraído do token.
        const usuario = await prisma.tb_usuario.findUnique({
            where: {
                id: BigInt(id),
            }
        });

        // Se o usuário não existir, retorna erro de não encontrado.
        if (!usuario) {
            res.status(404).json(HttpResult.Fail("Erro: Usuario não existe!"));
            return; 
        }

        // Inicializa a variável novoUsuario com os dados atuais do usuário.
        let novoUsuario = usuario;

        // Se a operação solicitada for para alterar informações pessoais como o nome e o email entao:
        if (operacao == "Info") {

            // Valida se o nome foi informado.
            if (!nome) {
                res.status(200).json(HttpResult.Fail("Erro: Nome Completo não Informado!"));
                return;
            }

            // Valida se o email foi informado.
            if (!email) {
                res.status(200).json(HttpResult.Fail("Erro: E-mail não Informado!"));
                return;
            }
            
            // Se o nome informado for diferente do atual, valida o formato e tamanho do novo nome.
            if (nome != usuario.nome) {
                if (!Utils.NomeValido(nome)) {
                    res.status(200).json(HttpResult.Fail("Erro: Nome Completo com Formato Inválido!"));
                    return;
                } else if (nome.length > 30) {
                    res.status(200).json(HttpResult.Fail("Erro: Nome Completo Muito Grande!"));
                    return;
                }
    
                // Atualiza o nome no objeto novoUsuario.
                novoUsuario = { ...novoUsuario, nome: nome };
            }
    
            // Se o email informado for diferente do atual, valida o formato, tamanho e se o email já está cadastrado.
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
    
                // Atualiza o email no objeto novoUsuario.
                novoUsuario = { ...novoUsuario, email: email };
            }
        } if (operacao == "Senha") {
            // Se a operação solicitada for para alterar a senha entao:

            // Valida se a senha atual foi informada.
            if (!senha) {
                res.status(200).json(HttpResult.Fail("Erro: Senha não Informada!"));
                return;
            }

            // Valida se a nova senha foi informada.
            if (!novaSenha) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha não Informada!"));
                return;
            }

            // Verifica se a senha atual atende aos critérios de formato e tamanho.
            if (senha.length > 255 || !Utils.SenhaValida(senha)) {
                res.status(200).json(HttpResult.Fail("Erro: Senha com Formato Inválido!"));
                return;
            }

            // Compara a senha atual informada com a senha armazenada para validar sua autenticidade.
            const validarSenha = await bcrypt.compare(senha, usuario.senha);

            if (!validarSenha) {
                res.status(200).json(HttpResult.Fail("Erro: Senha Incorreta!"));
                return;
            }
    
            // Valida se a nova senha atende aos critérios de formato e tamanho.
            if (!Utils.SenhaValida(novaSenha)) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha com Formato Inválido!"));
                return;
            } else if (novaSenha.length > 255) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha Muito Grande!"));
                return;
            }

            // Verifica se a nova senha não é igual à senha atual.
            const validarNovaSenha = await bcrypt.compare(novaSenha, usuario.senha);

            if (validarNovaSenha) {
                res.status(200).json(HttpResult.Fail("Erro: Nova Senha Igual a Antiga!"));
                return;
            }

            // Criptografa a nova senha para armazená-la de forma segura.
            const novaSenhaCriptografada = await bcrypt.hash(senha, 10);

            // Atualiza a senha no objeto novoUsuario.
            novoUsuario = { ...novoUsuario, senha: novaSenhaCriptografada };
        }

        // Atualiza os dados do usuário no banco de dados com as informações modificadas.
        const usuarioAtualizado = await prisma.tb_usuario.update({
            where: {
                id: BigInt(id),
            },
            data: novoUsuario
        });

        // Formata o objeto do usuário atualizado, convertendo o id para string devido o id ser bigint,
        // caso contrario ao enviar o id para front daria erro de stringfy.
        const usuarioFormatado = {
            ...usuarioAtualizado,
            id: usuarioAtualizado.toString(),
        };

        // Retorna os dados atualizados do usuário em resposta de sucesso.
        res.status(200).json(HttpResult.Success(usuarioFormatado));
    } catch (erro: any) {
        // Em caso de erro, irá retorna resposta com status 400 e mensagem de erro
        // além de imprimir no terminal o erro ocorrido.
        console.error(erro)
        res.status(400).json(HttpResult.Fail("Ocorreu um erro inesperado no criarConta"));
        return;
    }
}

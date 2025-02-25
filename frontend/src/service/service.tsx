import { Info, Login, Usuario } from "@/types/types";  // Importa os tipos de Login, Usuario e Info.
import axios from 'axios';  // Importa o axios para fazer requisições HTTP.

const url = 'https://rick-and-morty-api-back-end.onrender.com';  // Define a URL do servidor de backend que vai receber as requisições.

// Função para autenticar o usuário e retornar o token JWT.
export const autentica = async (login: Login) => {
    
    // Verifica se o parâmetro login foi passado
    if (!login) {
        throw new Error("Erro: O parâmetro login não está definido!");  // Se não, lança um erro
    }

    // Envia uma requisição POST para a rota '/entrar', passando os dados do login
    const response = await axios.post(`${url}/entrar`, login);

    // Retorna o token jwt caso a requisição for bem sucedida ou um erro que será interpretado e exibido pelo toast do frontend.
    return response.data;
}

// Função para cadastrar um novo usuário.
export const cadastrar = async (usuario: Usuario) => {
    // Verifica se o parâmetro usuario foi passado
    if (!usuario) {
        throw new Error("Erro: O parâmetro usuario não está definido!");  // Se não, lança um erro
    }

    // Envia uma requisição POST para a rota '/cadastrar', passando os dados do usuário
    const response = await axios.post(`${url}/cadastrar`, usuario);

    // Retorna a mensagem de sucesso caso a requisição for bem sucedida ou um erro que será interpretado e exibido pelo toast do frontend.
    return response.data;
};

// Função para obter os dados do usuário logado
export const getUsuario = async () => {
    // Tenta obter o token de autenticação armazenado no localStorage
    const token = localStorage.getItem("authToken");

    // Se o token não for encontrado, lança um erro
    if (!token) {
        throw new Error("Erro: O token não está definido!");
    }

    // Envia uma requisição GET para a rota '/central', passando o token no cabeçalho de autorização
    const response = await axios.get(`${url}/central`, {
        headers: {
            // Adiciona o token no cabeçalho da requisição para autenticação
            'Authorization': `Bearer ${token}`,  
        },
    });

    // Retorna os dados do usuario caso a requisição for bem sucedida ou um erro que será interpretado e exibido pelo toast do frontend.
    return response.data;
};

// Função para atualizar as informações do usuário
export const mudarInfo = async (info: Info) => {
    // Tenta obter o token de autenticação armazenado no localStorage
    const token = localStorage.getItem("authToken");

    // Se o token não for encontrado, lança um erro
    if (!token) {
        throw new Error("Erro: O token não está definido!");
    }

    // Verifica se o parâmetro info foi passado
    if (!info) {
        throw new Error("Erro: O parâmetro info não está definido!");  
    }

    // Envia uma requisição PUT para a rota '/central', passando as novas informações no corpo da requisição
    const response = await axios.put(`${url}/central`, info, {
        // Adiciona o token no cabeçalho da requisição para autenticação
        headers: {
            'Authorization': `Bearer ${token}`,  
        }
    });

    // Retorna a mensagem de sucesso caso a requisição for bem sucedida ou um erro que será interpretado e exibido pelo toast do frontend.
    return response.data;
};

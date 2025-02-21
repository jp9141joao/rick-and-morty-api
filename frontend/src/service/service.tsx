import { Login, Usuario } from "@/types/types";
import axios from 'axios';

const url = 'http://localhost:3000';

export const autentica = async (login: Login) => {
    
    if (!login) {
        throw new Error("Erro: O parâmetro login está faltando!");
    }

    const response = await axios.post(`${url}/entrar`, login, {
        validateStatus: (status) => {
            return status != 400;
        }
    });

    return response.data;
};

export const cadastrar = async (usuario: Usuario) => {
    
    if (!usuario) {
        throw new Error("Erro: O parâmetro usuario está faltando!");
    }

    const response = await axios.post(`${url}/entrar`, usuario, {
        validateStatus: (status) => {
            return status != 400;
        }
    });

    return response.data;
};
import { AlterarInfo, Login, Usuario } from "@/types/types";
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

export const getUsuario = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Erro: O token está faltando!")
    }

    const response = await axios.get(`${url}/central`, {
        validateStatus: (status) => {
            return status != 400
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.data;
};

export const mudarInfo = async (info: AlterarInfo) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Erro: O token está faltando!")
    }

    if (!info) {
        throw new Error("Erro: O parâmetro info está faltando!");
    }

    const response = await axios.put(`${url}/central`, info, {
        validateStatus: (status) => {
            return status != 400;
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.data;
};
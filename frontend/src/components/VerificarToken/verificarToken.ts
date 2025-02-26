// Importa a função jwtDecode que é utilizada para decodificar tokens JWT.
import { jwtDecode } from "jwt-decode";

// Função que verifica se o token de autenticação expirou.
export const VerificarToken = () => {

    // Obtém o token de autenticação armazenado no localStorage.
    const token = localStorage.getItem('authToken');

    // Se existir um token armazenado ele continua para decodificar ele e verificar se é valido
    // caso contrario não faz nada.
    if (token) {
        // Decodifica o token para extrair suas informações, principalmente a propriedade "exp" que indica o tempo de expiração.
        // O tipo { exp?: number } define que a propriedade "exp" pode existir e ser do tipo número.
        const tokenDecodificado: { exp?: number } = jwtDecode(token);

        // Se o token decodificado possui a propriedade "exp" que é o tempo de experação:
        if (tokenDecodificado.exp) {
            // Obtém o tempo atual em segundos.
            // Date.now() retorna o tempo atual em milissegundos, por isso é dividido por 1000 para converter para segundos.
            const tempo = Date.now() / 1000;

            // Se o tempo de expiração do token for menor que o tempo atual,
            // isso indica que o token já expirou.
            if (tokenDecodificado.exp < tempo) {
                // Remove o token expirado do localStorage.
                localStorage.removeItem('authToken');
                // Recarrega a página, como o token foi excluido, ele será redirecionado para a rota '/entrar'.
                window.location.reload();
            }
        }
    }
};

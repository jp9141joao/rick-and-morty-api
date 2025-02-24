import { ReactNode } from 'react'; // Importa o tipo ReactNode do React, que é utilizado para definir um tipo genérico para qualquer componente.
import { Navigate } from 'react-router-dom'; // Importa o componente <Navigate>, que é utilizado para direcionar o usuario para outra pagina.

// Define o componente <RotaProtegida>, é utilizado para proteger as rotas 
// impedindo que o usuario acesse elas se não estiver logado.
export const RotaProtegida = ({ children }: { children: ReactNode}) => {
    // children: É uma proprieda do tipo ReactNode e ela deverá ser o 
    // componente que será renderizado caso o usuario esteja logado.

    // token: Pega o token que foi armezenado no localStorage no momento do login,
    // caso o token não exista no localStorage, será armazenado null na variavel. 
    const token = localStorage.getItem('authToken');

    // Verifica se o token existe ou seja se ele é diferente de null
    // caso não exista ele utiliza o <Navigate> para navegar até a pagina de login.
    if (!token) {
        return <Navigate to='/entrar' />;
    }

    // Caso o token exista ele renderiza a propriedade children.
    return children;
};

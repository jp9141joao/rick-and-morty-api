import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const RotaProtegida = ({ children }: { children: ReactNode}) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to='/entrar' />;
    }

    return children;
};

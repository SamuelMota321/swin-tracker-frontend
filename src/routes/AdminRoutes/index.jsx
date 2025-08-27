import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../providers/AppContext";

export const AdminRoutes = () => {
    const { user, userState } = useContext(AppContext);
    console.log(userState?.role)
    // Verifica se o usuário está logado E se a role dele é 'admin'
    if (!user || userState?.role !== 'admin') {
        // Se não for, redireciona para a página principal de competições
        return <Navigate to="/competicoes" />;
    }

    // Se for admin, permite o acesso à rota filha (no caso, a página de registrar técnico)
    return <Outlet />;
};
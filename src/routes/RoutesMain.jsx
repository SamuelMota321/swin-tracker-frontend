import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/index";
import { Competition } from "../pages/Competition/index";
import { MyAthletes } from "../pages/MyAthletes/index";
import { MyAccount } from "../pages/MyAccount/index";
import { Register } from "../pages/Register/index";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CompetitionRegister } from "../pages/CompetitionRegister";
import { useContext } from "react";
import { AppContext } from "../providers/AppContext";
import { AdminRoutes } from "./AdminRoutes"; 
import { RegisterCoach } from "../pages/RegisterCoach"; 
import { ChangePassword } from "../pages/ChangePassword"; // 1. Importe a nova página

export const RoutesMain = () => {
    const { userState } = useContext(AppContext);
    return (
        <Routes>
            <Route path="/" element={userState ? <Competition/> : <Home />} />
            <Route path="/registrar" element={<Register />} />
            
            <Route element={<ProtectedRoutes />}>
                <Route path="/competicoes" element={<Competition />} />
                <Route path="/registrar-competicao" element={<CompetitionRegister />} />
                <Route path="/meus-atletas" element={<MyAthletes />} />
                <Route path="/minha-conta" element={<MyAccount />} />
                <Route path="/trocar-senha" element={<ChangePassword />} /> 
            </Route>

            <Route element={<AdminRoutes />}>
                <Route path="/registrar-tecnico" element={<RegisterCoach />} />
            </Route>
        </Routes>
    );
};
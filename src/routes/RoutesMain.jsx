import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/index"
import { Competition } from "../pages/Competition/index"
import { MyAthletes } from "../pages/MyAthletes/index"
import { MyAccount } from "../pages/MyAccount/index"
import { Register } from "../pages/Register/index"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { CompetitionRegister } from "../pages/CompetitionRegister"
import { useContext } from "react"
import { AppContext } from "../providers/AppContext"
import { AdminRoutes } from "./AdminRoutes" // Importe a nova rota
import { RegisterCoach } from "../pages/RegisterCoach" // Importe a nova página

export const RoutesMain = () => {
    const { user } = useContext(AppContext)
    return (
        <Routes>
            <Route path="/" element={user ?<Competition/> : <Home />} />
            <Route path="/registrar" element={<Register />} />
            
            {/* Rotas para usuários logados */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/competicoes" element={<Competition />} />
                <Route path="/registrar-competicao" element={<CompetitionRegister />} />
                <Route path="/meus-atletas" element={<MyAthletes />} />
                <Route path="/minha-conta" element={<MyAccount />} />
            </Route>

            {/* Rota exclusiva para ADMIN */}
            <Route element={<AdminRoutes />}>
                <Route path="/registrar-tecnico" element={<RegisterCoach />} />
            </Route>
        </Routes>
    )
}
import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/index"
import { Competition } from "../pages/Competition/index"
import { MyAthletes } from "../pages/MyAthletes/index"
import { MyAccount } from "../pages/MyAccount/index"
import { Register } from "../pages/Register/index"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { CompetitionRegister } from "../pages/CompetitionRegister"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/competicoes" element={<ProtectedRoutes />} >
                <Route index element={<Competition />} />
            </Route>
            <Route path="/registrar-competicao" element={<ProtectedRoutes />} >
                <Route index element={<CompetitionRegister />} />
            </Route>
            <Route path="/meus-atletas" element={<ProtectedRoutes />}>
                <Route index element={<MyAthletes />} />
            </Route>
            <Route path="/minha-conta" element={<ProtectedRoutes />} >
                <Route index element={<MyAccount />} />
            </Route>
        </Routes>
    )
}
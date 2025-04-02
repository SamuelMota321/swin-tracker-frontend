import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from "../../providers/AppContext"

export const ProtectedRoutes = () => {
    const { user } = useContext(AppContext)

    return user ?  <Outlet /> : <Navigate to ="/" />

}
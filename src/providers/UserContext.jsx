import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const UserContext = createContext({});

export const UserContextPovider = ({ children }) => {
    const [userState, setUserState] = useState(null);
    const [user, setUser] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setError(false)
    }, [location])

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post("/auth/login", formData);
            localStorage.setItem("@TOKEN", data.token);
            navigate("/competicoes");
            setUser(true);

        } catch (error) {
            console.log(error);
        }
    }

    const userLogout = () => {
        localStorage.removeItem("@TOKEN");
        setUserState(null);
        setUser(false);
        navigate("/");
    }


    return (
        <UserContext.Provider value={{userLogin, userLogout, error, userState, user}}>
            {children}
        </UserContext.Provider>
        )
}
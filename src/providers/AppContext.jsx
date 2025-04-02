import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";


// esse arquivo pode ser divididos em outros contextos dependendo
// da construção do backend
export const AppContext = createContext({});

export const AppContextPovider = ({ children }) => {
    const [userState, setUserState] = useState(null);
    const [user, setUser] = useState(false);
    const [error, setError] = useState("");
    const [searchList, setSearchList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setError(false)
    }, [location])

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post("/auth/login", formData, {
                headers: { "Content-Type": "application/json" }
            });

            localStorage.setItem("@TOKEN", data.token);
            navigate("/competicoes");
            setUser(true);
        } catch (error) {
            console.log(error);
        }
    };

    const userLogout = () => {
        localStorage.removeItem("@TOKEN");
        setUserState(null);
        setUser(false);
        navigate("/");
    }


    // Essa parte do código pode ser passada futuramente para um Athlete 
    // context assim como a suas variáveis quando tiver outras funções
    // somente para atletas e que não estejam em um contexto de usuário
    const searchAthletes = async (searchTerm) => {
        try {
            const { data } = await api.get(`/parciais?atleta=${searchTerm}`);
            setSearchList(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AppContext.Provider value={{
            userLogin,
            userLogout,
            searchAthletes,
            error,
            userState,
            user,
            searchList
        }}>
            {children}
        </AppContext.Provider>
    )
}
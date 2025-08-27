import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from 'react-toastify';

export const AppContext = createContext({});

export const AppContextPovider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [error, setError] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [athleteList, setAthleteList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Efeito para carregar o usuário do localStorage ao iniciar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const storedUser = localStorage.getItem("@USER");
    if (token && storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Limpa estados de busca ao mudar de página
  useEffect(() => {
    setError("");
    setSearchList([]);
  }, [location]);

  const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      
      const standardizedUser = {
        ...data.user,
        role: data.user.type === 'adm' ? 'admin' : data.user.type
      };
      delete standardizedUser.type;

      localStorage.setItem("@TOKEN", data.token);
      localStorage.setItem("@USER", JSON.stringify(standardizedUser));
      
      setUserState(standardizedUser); // Atualiza o estado
      navigate("/competicoes");
    } catch (error) {
      toast.error("Login ou senha inválidos.");
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USER");
    setUserState(null);
    navigate("/");
  };
  
  const registerCoach = async (formData) => {
    const payload = { ...formData, password: "12345678", role: "tecnico" };
    try {
      const token = localStorage.getItem("@TOKEN");
      await api.post("/auth/registrar-tecnico", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Técnico registrado com sucesso!");
      navigate("/competicoes");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro.";
      toast.error(errorMessage);
    }
  };

  // --- Suas outras funções permanecem aqui ---
  const competitionRegister = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      await api.post("/tecnico/criar-competicao", formData, authorization);
      navigate("/competicoes");
    } catch (error) { console.log(error); }
  };

  const getAthleteList = async () => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await api.get("/tecnico/meus-atletas", authorization);
      setAthleteList(data);
    } catch (error) { console.log(error); }
  };

  const registerAthlete = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      await api.post("/tecnico/adiconar-atleta", formData, authorization);
    } catch (error) { setError(error.response.data.message); }
  };

  const searchAthletes = async (searchTerm) => {
    try {
      const { data } = await api.get(`/parciais?atleta=${searchTerm}`);
      setSearchList(data);
    } catch (error) { console.log(error); }
  };

  const searchCompetition = async (searchTerm) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await api.get(`/competicao/${searchTerm}`, authorization);
      setSearchList(data);
    } catch (error) { console.log(error); }
  };

  const patchPartials = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      await api.patch("/tecnico/atualizar-parciais", formData, authorization);
    } catch (error) { console.log(error); }
  };

  return (
    <AppContext.Provider value={{
      userLogin,
      userLogout,
      registerCoach,
      userState,
      user: !!userState,
      searchAthletes, getAthleteList, competitionRegister, registerAthlete, searchCompetition, patchPartials, error, searchList, athleteList,
    }}>
      {children}
    </AppContext.Provider>
  );
};
import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from 'react-toastify';

export const AppContext = createContext({});

export const AppContextPovider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // NOVO ESTADO DE LOADING
  const [error, setError] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [athleteList, setAthleteList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const storedUser = localStorage.getItem("@USER");
    if (token && storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setError("");
    setSearchList([]);
  }, [location]);

const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      
      const standardizedUser = { ...data.user, role: data.user.type === 'adm' ? 'admin' : data.user.type };
      delete standardizedUser.type;

      // Salva o token e o usuário de qualquer forma, pois o token é necessário
      localStorage.setItem("@TOKEN", data.token);
      localStorage.setItem("@USER", JSON.stringify(standardizedUser));
      setUserState(standardizedUser);
      
      // VERIFICAÇÃO DA SENHA PADRÃO
      if (formData.password === "12345678") {
        toast.warn("Por favor, altere sua senha padrão.");
        navigate("/trocar-senha"); // Redireciona para a página de troca de senha
      } else {
        navigate("/competicoes"); // Redirecionamento normal
      }
    } catch (error) {
      toast.error("Login ou senha inválidos.");
    }
  };

  const changePassword = async (formData) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("@TOKEN");
      // Assumindo que a rota seja /auth/trocar-senha e o método seja PATCH
      await api.post("/auth/trocar-senha", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Senha alterada com sucesso! Por favor, faça o login novamente.");
      userLogout(); // Desloga o usuário para ele entrar com a nova senha
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Não foi possível alterar a senha.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
      await api.post("/auth/registrar-tecnico", payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Técnico registrado com sucesso!");
      navigate("/competicoes");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro.";
      toast.error(errorMessage);
    }
  };

  const competitionRegister = async (formData) => {
    setIsLoading(true); // ATIVA O LOADING
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      await api.post("/tecnico/criar-competicao", formData, authorization);
      toast.success("Competição criada com sucesso!"); // NOTIFICAÇÃO
      navigate("/competicoes");
    } catch (error) { 
      console.log(error); 
      toast.error("Falha ao criar competição.");
    } finally {
      setIsLoading(false); // DESATIVA O LOADING (SEMPRE)
    }
  };

  const getAthleteList = async () => {
    try {
      const token = localStorage.getItem("@TOKEN");
      const { data } = await api.get("/tecnico/meus-atletas", { headers: { Authorization: `Bearer ${token}` } });
      setAthleteList(data);
    } catch (error) { console.log(error); }
  };

  const registerAthlete = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      await api.post("/tecnico/adiconar-atleta", formData, { headers: { Authorization: `Bearer ${token}` } });
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
      const { data } = await api.get(`/competicao/${searchTerm}`, { headers: { Authorization: `Bearer ${token}` } });
      setSearchList(data);
    } catch (error) { console.log(error); }
  };

  const patchPartials = async (formData) => {
    setIsLoading(true); // ATIVA A TELA DE LOADING
    try {
      const token = localStorage.getItem("@TOKEN");
      const authorization = { headers: { Authorization: `Bearer ${token}` } };
      await api.patch("/tecnico/atualizar-parciais", formData.partials, authorization);
      
      toast.success("Tempos atualizados com sucesso!"); // NOTIFICAÇÃO DE SUCESSO

    } catch (error) {
      console.log(error);
      toast.error("Falha ao atualizar os tempos. Tente novamente."); // NOTIFICAÇÃO DE ERRO
    } finally {
      setIsLoading(false); // DESATIVA A TELA DE LOADING (SEMPRE)
    }
  };

  return (
    <AppContext.Provider value={{
      userLogin, userLogout, registerCoach, userState, user: !!userState,
      isLoading, // Exporta o estado de loading
      changePassword,
      searchAthletes, getAthleteList, competitionRegister, registerAthlete, searchCompetition, patchPartials, error, searchList, athleteList,
    }}>
      {children}
    </AppContext.Provider>
  );
};
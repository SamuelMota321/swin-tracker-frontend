import { useEffect, useState } from "react"
import { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { api } from "../services/api"


// esse arquivo pode ser divididos em outros contextos dependendo
// da construção do backend
export const AppContext = createContext({})

export const AppContextPovider = ({ children }) => {
  const [userState, setUserState] = useState(null)
  const [user, setUser] = useState(false)
  const [error, setError] = useState("")
  const [searchList, setSearchList] = useState([])
  const [athleteList, setAthleteList] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setError("")
  }, [location])

  const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/json" }
      })
      localStorage.setItem("@TOKEN", data.token)
      navigate("/competicoes")
      setUserState(data.user)
      setUser(true)
    } catch (error) {
      console.log(error)
    }
  }

  const userLogout = () => {
    localStorage.removeItem("@TOKEN")
    setUserState(null)
    setUser(false)
    navigate("/")
  }

  const userRegister = async (formData) => {
    try {
      const { data } = await api.post("")
    } catch (error) {
      console.log(error)
    }
  }

  const competitionRegister = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const authorization = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await api.post("/tecnico/criar-competicao", formData, authorization)
      navigate("/competicoes")

    } catch (error) {
      console.log(error)
    }
  }

  const getAthleteList = async () => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const authorization = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await api.get("/tecnico/meus-atletas", authorization)
      setAthleteList(data)
    } catch (error) {
      console.log(error)
    }
  }

  const registerAthlete = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const authorization = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await api.post("/tecnico/adiconar-atleta", formData, authorization)
    } catch (error) {
      const errorMessage = error.response.data.message
      setError(errorMessage)
    }
  }

  const searchAthletes = async (searchTerm) => {
    try {
      const { data } = await api.get(`/parciais?atleta=${searchTerm}`)
      setSearchList(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <AppContext.Provider value={{
      userLogin,
      userLogout,
      searchAthletes,
      getAthleteList,
      competitionRegister,
      registerAthlete,
      error,
      userState,
      user,
      searchList,
      athleteList
    }}>
      {children}
    </AppContext.Provider>
  )
}
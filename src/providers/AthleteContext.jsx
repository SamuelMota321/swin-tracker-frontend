import { createContext } from "react";

export const AthleteContext = createContext({});

export const AthleteContextProvider = ({ children }) => {
    const [athleteList, setAthleteList] = useState([]);
    
}
import { useContext, useState } from "react";
import { Input } from "../Input";
import { AthleteCard } from "./AthetesCard";
import { AppContext } from "../../providers/AppContext";

export const Search = () => {
    const { searchAthletes, searchList } = useContext(AppContext)
    const [searchInputContent, setSearchInputContent] = useState("");


    const submit = (searchTerm) => {
        searchAthletes(searchTerm);
    }


    return (
        <div>
            <Input
                type="text"
                search="true"
                onChange={(e) => {
                    setSearchInputContent(e.target.value);
                    submit(searchInputContent);
                }}
            />
            {searchInputContent ?
                <p >Resultados de busca para:
                    <span>{searchInputContent}</span>
                </p> : null}

            {searchInputContent == "" ? null :
                searchList[0] ? <ul>
                    {searchList.map((athlete, i) => (
                        <AthleteCard key={i}
                            name={athlete.athleteName}
                            competition={athlete.competitionName}
                            proof={athlete.proof}
                            partials={athlete.partials} />
                    ))} </ul> : <>
                    <div>
                        <h1 >Desculpe! :(</h1>
                        <p>Nenhum resultado encontrado</p>
                    </div>
                </>}
        </div>
    )
}
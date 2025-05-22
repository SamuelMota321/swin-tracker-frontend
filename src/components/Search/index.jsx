import { useContext, useState } from "react"
import { Input } from "../Input"
import { AthleteCard } from "./AthetesCard"
import { AppContext } from "../../providers/AppContext"
import { CompetitionCard } from "./CompetitionCard"

export const SearchAthletes = () => {
  const { searchAthletes, searchList } = useContext(AppContext)
  const [searchInputContent, setSearchInputContent] = useState("")

  const submit = (searchTerm) => {
    searchAthletes(searchTerm)
  }

  return (
    <div>
      <Input
        type="text"
        search="true"
        onChange={(e) => {
          setSearchInputContent(e.target.value)
          submit(searchInputContent)
        }}
      />

      {searchInputContent ?
        <p >Resultados de busca para:
          <span>{searchInputContent}</span>
        </p> : null}

      {searchInputContent == "" ? null :
        searchList ?
          <ul>
            {searchList.map((data, i) => {
              return (
                <AthleteCard key={i}
                  name={data.athleteName}
                  competition={data.competitionName}
                  proof={data.proof}
                  partials={data.partials} />
              )
            })}
          </ul>
          :
          <div>
            <h1 >Desculpe! :(</h1>
            <p>Nenhum resultado encontrado</p>
          </div>
      }
    </div>
  )
}

export const SearchCompetition = () => {
  const { searchCompetition, searchList } = useContext(AppContext)
  const [searchInputContent, setSearchInputContent] = useState("")

  const submit = (searchTerm) => {
    searchCompetition(searchTerm)
  }

  return (
    <>
      <Input
        type="text"
        search="true"
        onChange={(e) => {
          setSearchInputContent(e.target.value)
          submit(searchInputContent)
        }}
      />

      {searchInputContent ?
        <p >Resultados de busca para:
          <span>{searchInputContent}</span>
        </p> : null}

      {searchInputContent == "" ? null :
        searchList ?
          <ul>
            {
              searchList.map((data, i) => {
                const proofsNames = Object.keys(data.proofs)
                return proofsNames.map((proofName, i) => {
                  return (
                    <CompetitionCard key={i}
                      competitionName={data.competitionName}
                      proofName={proofName}
                      data={data.proofs[proofName]} 
                    />
                  )
                })
              })}
          </ul>
          :
          <div>
            <h1 >Desculpe! :(</h1>
            <p>Nenhum resultado encontrado</p>
          </div>
      }
    </>
  )
}
import { useContext, useState } from "react"
import { Input } from "../Input"
import { AthleteCard } from "./AthetesCard"
import { AppContext } from "../../providers/AppContext"
import { CompetitionCard } from "./CompetitionCard"
import styles from "./styles.module.scss"

export const SearchAthletes = () => {
  const { searchAthletes, searchList } = useContext(AppContext)
  const [searchInputContent, setSearchInputContent] = useState("")

  const submit = (searchTerm) => {
    searchAthletes(searchTerm)
  }

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome do atleta..."
        onChange={(e) => {
          setSearchInputContent(e.target.value)
          submit(searchInputContent)
        }}
      />

      {searchInputContent && (
        <div className={styles.searchResults}>
          <p className={styles.searchQuery}>
            Resultados de busca para:
            <span>{searchInputContent}</span>
          </p>

          {searchList ? (
            <ul className={styles.resultsList}>
              {searchList.map((data, i) => (
                <AthleteCard 
                  key={i}
                  name={data.athleteName}
                  competition={data.competitionName}
                  proof={data.proof}
                  partials={data.partials} 
                />
              ))}
            </ul>
          ) : (
            <div className={styles.noResults}>
              <h1>Desculpe! :(</h1>
              <p>Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      )}
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
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome da competição..."
        onChange={(e) => {
          setSearchInputContent(e.target.value)
          submit(searchInputContent)
        }}
      />

      {searchInputContent && (
        <div className={styles.searchResults}>
          <p className={styles.searchQuery}>
            Resultados de busca para:
            <span>{searchInputContent}</span>
          </p>

          {searchList ? (
            <ul className={styles.resultsList}>
              {searchList.map((data, i) => {
                const proofsNames = Object.keys(data.proofs)
                return proofsNames.map((proofName, j) => (
                  <CompetitionCard 
                    key={`${i}-${j}`}
                    competitionName={data.competitionName}
                    proofName={proofName}
                    data={data.proofs[proofName]} 
                  />
                ))
              })}
            </ul>
          ) : (
            <div className={styles.noResults}>
              <h1>Desculpe! :(</h1>
              <p>Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
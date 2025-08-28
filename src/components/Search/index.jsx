import { useContext, useState } from "react";
import { Input } from "../Input";
import { AthleteCard } from "./AthetesCard";
import { CompetitionResultCard } from "../CompetitionResultCard"; // 1. Importe o novo componente
import { AppContext } from "../../providers/AppContext";
import styles from "./styles.module.scss";

export const SearchAthletes = () => {
  const { searchAthletes, searchList } = useContext(AppContext);
  const [searchInputContent, setSearchInputContent] = useState("");

  const submit = (searchTerm) => {
    searchAthletes(searchTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome do atleta..."
        value={searchInputContent}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInputContent(value);
          submit(value);
        }}
      />
      {searchInputContent && (
        <div className={styles.searchResults}>
          <p className={styles.searchQuery}>Resultados para: <span>{searchInputContent}</span></p>
          {searchList.length > 0 ? (
            <ul className={styles.resultsList}>
              {searchList.map((data, i) => (
                <AthleteCard key={i} {...data} />
              ))}
            </ul>
          ) : (
            <div className={styles.noResults}>
              <h1>Nenhum resultado encontrado</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const SearchCompetition = () => {
  const { searchCompetition, searchList } = useContext(AppContext);
  const [searchInputContent, setSearchInputContent] = useState("");

  const submit = (searchTerm) => {
    searchCompetition(searchTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome da competição..."
        value={searchInputContent}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInputContent(value);
          submit(value);
        }}
      />
      {searchInputContent && (
        <div className={styles.searchResults}>
          <p className={styles.searchQuery}>Resultados para: <span>{searchInputContent}</span></p>
          {searchList.length > 0 ? (
            <ul className={styles.resultsList}>
              {searchList.map((data, i) => {
                const proofsNames = Object.keys(data.proofs);
                return proofsNames.map((proofName, j) => (
                  // 2. Use o novo componente aqui
                  <CompetitionResultCard 
                    key={`${i}-${j}`}
                    competitionName={data.competitionName}
                    proofName={proofName}
                    data={data.proofs[proofName]} 
                  />
                ));
              })}
            </ul>
          ) : (
            <div className={styles.noResults}>
              <h1>Nenhuma competição encontrada</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
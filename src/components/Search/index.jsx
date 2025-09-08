import { useContext, useState, useEffect, useRef } from "react";
import { Input } from "../Input";
import { AthleteCard } from "./AthetesCard";
import { CompetitionResultCard } from "../CompetitionResultCard";
import { AppContext } from "../../providers/AppContext";
import styles from "./styles.module.scss";

export const SearchAthletes = () => {
  const { searchAthletes, searchList } = useContext(AppContext);
  const [searchInputContent, setSearchInputContent] = useState("");
  const debounceTimeout = useRef(null);

  const handleSearch = (searchTerm) => {
    searchAthletes(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInputContent(value);

    // Limpa timeout anterior
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Cria novo timeout de 1s
    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      handleSearch(searchInputContent);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome do atleta..."
        value={searchInputContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
  const debounceTimeout = useRef(null);

  const handleSearch = (searchTerm) => {
    searchCompetition(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInputContent(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      handleSearch(searchInputContent);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        search="true"
        placeholder="Digite o nome da competição..."
        value={searchInputContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchInputContent && (
        <div className={styles.searchResults}>
          <p className={styles.searchQuery}>Resultados para: <span>{searchInputContent}</span></p>
          {searchList.length > 0 ? (
            <ul className={styles.resultsList}>
              {searchList.map((data, i) => {
                const proofsNames = Object.keys(data.proofs);
                return proofsNames.map((proofName, j) => (
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

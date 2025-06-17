import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { SearchCompetition } from "../../components/Search"
import styles from "./styles.module.scss"

export const Competition = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Competições</h1>
                    <Button 
                        onClick={() => navigate("/registrar-competicao")} 
                        text="Registrar Competição" 
                        size="large"
                    />
                </div>
                <div className={styles.searchSection}>
                    <SearchCompetition />
                </div>
            </div>
        </div>
    )
}
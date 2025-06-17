import { FormLogin } from "../../components/FormLogin"
import { SearchAthletes } from "../../components/Search"
import styles from "./styles.module.scss"

export const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.loginSection}>
                    <h1>Login</h1>
                    <p className={styles.subtitle}>Apenas técnicos</p>
                    <FormLogin />
                </div>
                <div className={styles.searchSection}>
                    <h1>Procurar Atleta</h1>
                    <SearchAthletes />
                </div>
            </div>
        </div>
    )
}
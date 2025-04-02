import { FormLogin } from "../../components/FormLogin"
import { Search } from "../../components/Search"
import styles from "./styles.module.scss"

export const Home = () => {
    return (
        <>
            <section className={styles.flex}>
                <div className={styles.loginBox}>
                    <h1>Login</h1>
                    <p>Apenas Técnicos</p>
                    <FormLogin />

                </div>
                <div>
                    <h1>Procurar atleta</h1>
                    <Search />
                </div>
            </section>
        </>
    )
}
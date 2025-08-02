import { useContext } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "../../providers/AppContext"
import { Link } from "react-router-dom"

export const Header = () => {
    const { userState, user, userLogout } = useContext(AppContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            
            {user && (
                <div className={styles.searchHeader}>
                    <input 
                        type="text" 
                        placeholder="Pesquisar atleta"
                    />
                </div>
            )}
            
            {user ? (
                <nav>
                    <ul>
                        <li><Link to={"/competicoes"}>Competições</Link></li>
                        <li><Link to={"/meus-atletas"}>Meus atletas</Link></li>
                        <li><Link to={"/minha-conta"}>Minha conta</Link></li>
                        <li onClick={() => userLogout()}>Sair</li>
                    </ul>
                </nav>
            ) : null}
        </header>
    )
}
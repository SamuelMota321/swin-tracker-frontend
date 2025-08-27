import { useContext } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "../../providers/AppContext"
import { Link } from "react-router-dom"

export const Header = () => {
    const { user, userLogout } = useContext(AppContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/logo.svg" alt="Swintracker Logo" />
                <span>Swintracker</span>
            </div>
            
            {user && (
                 <nav>
                    <ul>
                        <li><Link to={"/competicoes"}>Competições</Link></li>
                        <li><Link to={"/meus-atletas"}>Meus atletas</Link></li>
                        <li onClick={() => userLogout()}>Sair</li>
                    </ul>
                </nav>
            )}
        </header>
    )
}
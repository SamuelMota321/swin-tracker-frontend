import { useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../providers/AppContext";
import { Link } from "react-router-dom";

export const Header = () => {
    const { userState, userLogout } = useContext(AppContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/logo.svg" alt="Swintracker Logo" />
                <span>Swintracker</span>
            </div>
            
            {userState && (
                 <nav>
                    <ul>
                        {/* A verificação é feita diretamente na propriedade 'role' do estado */}
                        {userState.role === 'admin' && (
                            <li><Link to={"/registrar-tecnico"}>Registrar Técnico</Link></li>
                        )}
                        <li><Link to={"/competicoes"}>Competições</Link></li>
                        <li><Link to={"/meus-atletas"}>Meus atletas</Link></li>
                        <li onClick={() => userLogout()}>Sair</li>
                    </ul>
                </nav>
            )}
        </header>
    );
};
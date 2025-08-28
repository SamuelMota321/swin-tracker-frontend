import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../providers/AppContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importa os ícones de hambúrguer e 'X'

export const Header = () => {
    const { userState, userLogout } = useContext(AppContext);
    // Estado para controlar se o menu mobile está aberto
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para abrir/fechar o menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Função para fechar o menu ao clicar em um link
    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" onClick={closeMenu}>
                    <img src="/logo.svg" alt="Swimtracker Logo" />
                    <span>Swimtracker</span>
                </Link>
            </div>
            
            {userState && (
                <>
                    {/* Ícone do menu hambúrguer (só aparece em telas menores) */}
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    {/* Navegação */}
                    <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
                        <ul>
                            {userState.role === 'admin' && (
                                <li><Link to={"/registrar-tecnico"} onClick={closeMenu}>Registrar Técnico</Link></li>
                            )}
                            <li><Link to={"/competicoes"} onClick={closeMenu}>Competições</Link></li>
                            <li><Link to={"/meus-atletas"} onClick={closeMenu}>Meus atletas</Link></li>
                            <li onClick={() => { userLogout(); closeMenu(); }}>Sair</li>
                        </ul>
                    </nav>
                </>
            )}
        </header>
    );
};
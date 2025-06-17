import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

export const Register = () => {
     return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Link to="/" className={styles.backLink}>
                    <FaArrowLeft /> Voltar
                </Link>
                <h1 className={styles.title}>Registro</h1>
                <p className={styles.subtitle}>Funcionalidade em desenvolvimento...</p>
            </div>
        </div>
     )
}
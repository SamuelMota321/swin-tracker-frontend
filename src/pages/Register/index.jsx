import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { FormRegister } from "../../components/FormRegister"

export const Register = () => {
     return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Link to="/" className={styles.backLink}>
                    <FaArrowLeft /> Voltar
                </Link>
                <FormRegister />
            </div>
        </div>
     )
}
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Register = () => {
     return (
        <>
            <section>
                <Link to="/"><FaArrowLeft /> Voltar</Link>
            </section>
        </>
     )
}
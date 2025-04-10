import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

export const Competition = () => {
    const navigate = useNavigate();

    return (
        <>
            <section>
                <div>
                    <Button onClick={() => navigate("/registrar-competicao")} text="Registar Competição" />
                    <Input
                        type="text"
                        placeholder="Pesquisar Atleta"
                        search
                    />

                </div> 
            </section>
        </>
    )
} 
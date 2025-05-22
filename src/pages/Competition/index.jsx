import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { SearchCompetition } from "../../components/Search";

export const Competition = () => {
    const navigate = useNavigate();

    return (
        <>
            <section>
                <div>
                    <Button onClick={() => navigate("/registrar-competicao")} text="Registar Competição" />
                    <SearchCompetition />
                </div>
            </section>
        </>
    )
} 
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

export const Competition = () => {
    return (
        <>
            <section>
                <div>
                    <Button text="Registar Competição" />
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
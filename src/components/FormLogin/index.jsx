import { Link } from "react-router-dom"
import { Button } from "../Button"
import { Input } from "../Input"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AppContext } from "../../providers/AppContext"
import { loginSchema } from "../../schemas/LoginSchema"

export const FormLogin = () => {
    const { userLogin, error } = useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const submit = (formData) => {
        userLogin(formData);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    label="Usuário"
                    {...register("login")}
                    error={errors.login}
                />

                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    label="Senha"
                    {...register("password")}
                    error={errors.password}
                />
                <Button text="Continuar" />
            </form>
            <p>Não possui conta?<Link to="/registrar">Clique Aqui!</Link></p>
        </div>
    )
}
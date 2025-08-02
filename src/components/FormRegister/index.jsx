import { Link } from "react-router-dom"
import { Button } from "../Button"
import { Input } from "../Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import styles from "./styles.module.scss"

const registerSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"]
})

export const FormRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const submit = (formData) => {
        console.log(formData)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registre-se</h1>
            
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    label="Nome"
                    {...register("name")}
                    error={errors.name}
                />

                <Input
                    type="email"
                    placeholder="Digite seu email"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                />

                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    label="Senha"
                    {...register("password")}
                    error={errors.password}
                />

                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    label="Confirme sua senha"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                />
                
                <Button 
                    type="submit" 
                    text="Continuar" 
                    className={styles.submitButton}
                    size="large"
                />
            </form>
        </div>
    )
}
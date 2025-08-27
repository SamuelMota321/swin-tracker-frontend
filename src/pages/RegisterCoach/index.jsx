import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { registerCoachSchema } from "../../schemas/registerCoachSchema";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";

export const RegisterCoach = () => {
    const { registerCoach } = useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerCoachSchema)
    });

    const submit = (formData) => {
        registerCoach(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Registrar Novo Técnico</h2>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Input
                        label="Nome Completo"
                        placeholder="Digite o nome do técnico"
                        {...register("name")}
                        error={errors.name}
                    />
                    <Input
                        label="Login (usuário)"
                        placeholder="Ex: rodrigo.lacerda"
                        {...register("login")}
                        error={errors.login}
                    />
                    <Input
                        label="Equipe"
                        placeholder="Digite o nome da equipe"
                        {...register("team")}
                        error={errors.team}
                    />
                    <Button 
                        type="submit" 
                        text="Registrar Técnico"
                        className={styles.submitButton}
                        size="large"
                    />
                </form>
            </div>
        </div>
    );
};
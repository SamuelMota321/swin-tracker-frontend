import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { changePasswordSchema } from "../../schemas/changePasswordSchema";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";

export const ChangePassword = () => {
    const { changePassword } = useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(changePasswordSchema)
    });

    // A senha padrão é fixa, então não precisamos de um campo para ela no form
    const submit = (formData) => {
        changePassword({
            ...formData,
            defaultPassword: "12345678"
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Alterar Senha Padrão</h2>
                <p>Por segurança, você precisa criar uma nova senha para continuar.</p>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Input
                        type="password"
                        label="Nova Senha"
                        placeholder="Digite sua nova senha"
                        {...register("newPassword")}
                        error={errors.newPassword}
                    />
                    <Input
                        type="password"
                        label="Confirmar Nova Senha"
                        placeholder="Confirme sua nova senha"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword}
                    />
                    <Button 
                        type="submit" 
                        text="Salvar Nova Senha"
                        className={styles.submitButton}
                        size="large"
                    />
                </form>
            </div>
        </div>
    );
};
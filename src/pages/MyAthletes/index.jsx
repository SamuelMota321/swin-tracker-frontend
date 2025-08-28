import { useContext, useEffect } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { AppContext } from "../../providers/AppContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button";
import { myAthletesSchema } from "../../schemas/myAthletesSchema";
import styles from "./styles.module.scss";

export const MyAthletes = () => {
  // Pega o isLoading do contexto
  const { getAthleteList, athleteList, registerAthlete, error, isLoading } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(myAthletesSchema)
  });

  const submit = async (formData) => {
    await registerAthlete(formData);
    // Apenas atualiza a lista e reseta o formulário se não houver erro
    if (!error) {
        await getAthleteList();
        reset();
    }
  };

  useEffect(() => {
    getAthleteList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>Registrar Atleta</h2>
          <form onSubmit={handleSubmit(submit)}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <Input
              label="Nome do Atleta"
              placeholder="Digite o nome completo"
              {...register("name")}
              error={errors.name}
              disabled={isLoading} // Desabilita durante o loading
            />

            <Select
              label="Categoria"
              values={[ "Selecione uma categoria", "Mirim", "Petiz", "Infantil", "Juvenil", "Junior", "Senior" ]}
              {...register("category")}
              error={errors.category}
              disabled={isLoading} // Desabilita durante o loading
            />

            <Button 
              type="submit" 
              text={isLoading ? "Registrando..." : "Registrar"} 
              className={styles.submitButton}
              size="large"
              disabled={isLoading} // Desabilita o botão
            />
          </form>
        </div>

        <div className={styles.athletesList}>
          <h2>Meus Atletas</h2>
          {athleteList && athleteList.length > 0 ? (
            athleteList.map((athlete) => (
              <div key={athlete.id} className={styles.athleteItem}>
                <p>{athlete.name}</p>
              </div>
            ))
          ) : (
            <p className={styles.noAthletes}>Nenhum atleta encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
};
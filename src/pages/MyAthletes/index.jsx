import { useContext, useEffect } from "react"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
import { AppContext } from "../../providers/AppContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../components/Button"
import { myAthletesSchema } from "../../schemas/myAthletesSchema"
import styles from "./styles.module.scss"

export const MyAthletes = () => {
  const { getAthleteList, athleteList, registerAthlete, error } = useContext(AppContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(myAthletesSchema)
  });

  const submit = async (formData) => {
    try {
      await registerAthlete(formData)
      await getAthleteList()
      reset() // Clear form after successful submission
    } catch (err) {
      console.error("Erro ao registrar atleta:", err)
    }
  }

  useEffect(() => {
    getAthleteList()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>Registrar Atleta</h2>
          <form onSubmit={handleSubmit(submit)} className={styles.form}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <Input
              label="Nome do Atleta"
              placeholder="Digite o nome completo"
              {...register("name")}
              error={errors.name}
            />

            <Select
              label="Categoria"
              values={[
                "Selecione uma categoria",
                "Mirim",
                "Petiz",
                "Infantil",
                "Juvenil",
                "Junior",
                "Senior"
              ]}
              {...register("category")}
              error={errors.category}
            />

            <Button 
              type="submit" 
              text="Registrar" 
              className={styles.submitButton}
              size="large"
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
  )
}
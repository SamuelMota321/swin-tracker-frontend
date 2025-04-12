import { useContext, useEffect } from "react"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
import { AppContext } from "../../providers/AppContext"
import { useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../components/Button"
import { myAthletesSchema } from "../../schemas/myAthletesSchema"

export const MyAthletes = () => {
  const { getAthleteList, athleteList, registerAthlete, error } = useContext(AppContext)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(myAthletesSchema)
  });

  const submit = async (formData) => {
    try {
      await registerAthlete(formData)
      await getAthleteList()
    } catch (err) {
      console.error("Erro ao registrar atleta:", err)
    }
  }

  useEffect(() => {
    getAthleteList()
  }, [])

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              label={"Nome do Atleta"}
              {...register("name")}
              error={errors.name}
            />
            {error ? <p>{error}</p> : <></>}

            <Select
              label={"Categoria"}
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

            <Button type={"submit"} text={"Registrar"} />
          </form>
        </div>

        <div>
          {athleteList ? athleteList.map((athlete) => (
            <p key={athlete.id}> {athlete.name}</p>
          )) : <p>Nenhum atleta encontrado</p>}
        </div>
      </section>
    </>
  )
}
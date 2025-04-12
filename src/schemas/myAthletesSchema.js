import { z } from "zod";

export const myAthletesSchema = z.object({
  name: z
    .string()
    .min(1, "Forneça um nome"),
  category: z
    .enum(["Mirim", "Petiz", "Infantil", "Juvenil", "Junior", "Senior"], {
      errorMap: () => ({message: "Selecione uma categoria válida"})
    })
})
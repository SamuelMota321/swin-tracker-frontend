import { z } from "zod";

export const competitionRegisterSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  date: z.string().min(1, "A data é obrigatória"), // pode usar z.coerce.date() se quiser validar como Date
  poolType: z.enum(["25M", "50M"], {
    errorMap: () => ({ message: "Selecione um tipo de piscina válido" }),
  }),
  proofs: z
    .array(
      z.object({
        distance: z
          .number({
            invalid_type_error: "Informe a metragem da prova",
            required_error: "A metragem da prova é obrigatória",
          })
          .refine((val) => [50, 100, 200, 400, 800, 1500].includes(val), {
            message: "Metragem inválida",
          }),
        styleType: z.enum(["Borboleta", "Crawl", "Peito", "Costas", "Medley"], {
          errorMap: () => ({ message: "Selecione um estilo válido" }),
        }),
        series: z
          .array(
            z.object({
              serieNumber: z
                .number(),
              athletes: z
                .array(z.number())
                .min(1, "Selecione pelo menos um atleta"),
            })
          )
          .min(1, "Adicione pelo menos uma série"),
      })
    )
    .min(1, "Adicione pelo menos uma prova"),
});

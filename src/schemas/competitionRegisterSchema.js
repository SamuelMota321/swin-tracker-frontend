import { z } from "zod";

export const competitionRegisterSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
      }
    }
    return arg;
  }, z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, "Data deve estar no formato YYYY/MM/DD")),
  poolType: z.enum(["25", "50"], {
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
        proofOrder: z
          .number(),
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

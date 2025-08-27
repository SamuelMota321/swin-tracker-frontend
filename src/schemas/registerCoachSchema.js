import { z } from "zod";

export const registerCoachSchema = z.object({
  name: z.string().min(1, "O nome completo é obrigatório"),
  login: z.string().min(1, "O login de usuário é obrigatório"),
  team: z.string().min(1, "O nome da equipe é obrigatório"),
});
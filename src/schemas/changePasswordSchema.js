import { z } from "zod";

export const changePasswordSchema = z.object({
  newPassword: z.string()
    .min(6, "A nova senha deve ter pelo menos 6 caracteres.")
    .refine(password => password !== "12345678", {
      message: "A nova senha não pode ser igual à senha padrão.",
    }),
  confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória."),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], // Mostra o erro no campo de confirmação
});
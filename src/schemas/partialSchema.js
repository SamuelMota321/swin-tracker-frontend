import { z } from "zod"

// Função auxiliar para converter "ss.SS" ou dígitos para número
const parseTimeToNumber = (value) => {
  if (typeof value !== 'string') return value // Retorna se não for string
  const digits = value.replace(/\D/g, '');
  if (digits.length === 4) {
    const seconds = parseInt(digits.substring(0, 2), 10);
    const hundredths = parseInt(digits.substring(2, 4), 10);
    // Converte para um número representando o total de centésimos de segundo
    // Ou mantém como float ss.SS - vamos usar float para simplicidade inicial
    return parseFloat(`${seconds}.${hundredths}`);
  }
  // Tenta converter diretamente se não estiver no formato esperado
  const num = parseFloat(value);
  return isNaN(num) ? undefined : num; // Retorna undefined se não for um número válido
};

export const partialSchema = z.object({
  time: z.preprocess(
    (val) => parseTimeToNumber(val),  
    z.number({
      required_error: "O tempo é obrigatório",
      invalid_type_error: "O tempo deve ser um número",
    })
    .min(0.01, { message: "O tempo deve ser maior que zero" })
    // Adicione outras validações numéricas se necessário (ex: .max())
  )
})


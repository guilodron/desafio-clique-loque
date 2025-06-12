import { z } from 'zod/v4';

export const contractListSchema = z.object({
    userId: z.string()
});

export const contracListOutputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    titulo: z.string(),
    codigoContrato: z.string(),
    retencaoTecnica: z.number()
});

export const sendDataInputSchema = z.object({
  numeroNota: z.string().min(1, 'Número da nota é obrigatório'),
  dataEmissao: z.string().min(1, 'Data de emissão é obrigatória'),
  dataVencimento: z.string().min(1, 'Data de vencimento é obrigatória'),
  valor: z
    .string()
    .refine(val => /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Valor deve ser decimal com até 2 casas'
    }),
    issqn: z.string().optional(),
    irrf: z.string().optional(),
    csll: z.string().optional(),
    cofins: z.string().optional(),
    inss: z.string().optional(),
    pis: z.string().optional(),
    valorRetencao: z.string().optional(),
    percentual: z.string().optional()

});

export type SendDataInput = z.infer<typeof sendDataInputSchema>;
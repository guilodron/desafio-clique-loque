import type { ContractsDTO } from "@/hooks/loggedContextDto";
import { z } from "zod/v4";

export const receiptSchema = z.object({
  numeroNota: z.string().min(1, "Número da nota é obrigatório"),
  dataEmissao: z.string().min(1, "Data de emissão é obrigatória"),
  dataVencimento: z.string().min(1, "Data de vencimento é obrigatória"),
  valor: z
    .string()
    .refine(val => /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Valor deve ser decimal com até 2 casas",
    }),
    issqn: z.string().optional(),
    irrf: z.string().optional(),
    csll: z.string().optional(),
    cofins: z.string().optional(),
    inss: z.string().optional(),
    pis: z.string().optional(),
    valorRetencao: z.string().optional(),
    percentual: z.string().optional(),
    isRetencaoImpostosActive: z.boolean(),
    isRetencaoTecnica: z.boolean(),
    files: z.any()

}).check((ctx) => {
    console.log('retencao dentro do check ' + ctx.value.isRetencaoImpostosActive)
    if(ctx.value.isRetencaoImpostosActive) {
        type RetencaoField = "issqn" | "irrf" | "csll" | "cofins" | "inss" | "pis";
        (["issqn", "irrf", "csll", "cofins", "inss", "pis"] as RetencaoField[]).forEach(field => {
            if(!ctx.value[field] || ctx.value[field] == ''){
                ctx.issues.push({
                    code: "invalid_type",
                    expected: 'string',
                    input: ctx.value,
                    message: `${field} é obrigatório`,
                    path: [field]
                })
            }
        })
    }
});


export type ReceiptFormInput = z.infer<typeof receiptSchema>;

export interface ReceiptLocationState {
    contract: ContractsDTO;
}
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
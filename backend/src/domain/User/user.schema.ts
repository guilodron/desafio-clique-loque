import { validateCNPJ } from 'validations-br';
import { z } from 'zod/v4';

export const userLoginInputSchema = z.object({
    cnpj: z.custom<string>(((val: unknown) => {
        console.log('entrou aqui');
        return typeof val === 'string' && validateCNPJ(val);
    }), 'O CNPJ enviado é invalido')
});

export type UserLoginInput = z.infer<typeof userLoginInputSchema>;

export const userLoginOutputSchema = z.object({
    id: z.string(),
    cnpj: z.string(),
    nomeFantasia: z.string(),
    razaoSocial: z.string()
});

export const userRegisterInputSchema = z.object({
    cnpj: z.custom<string>(((val: unknown) => {
        console.log('entrou aqui');
        return typeof val === 'string' && validateCNPJ(val);
    }), 'O CNPJ enviado é invalido'),
    nomeFantasia: z.string(),
    razaoSocial: z.string()
});

export type UserRegisterInput = z.infer<typeof userRegisterInputSchema>;

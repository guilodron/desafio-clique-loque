import { validateCNPJ } from "validations-br";
import { z } from "zod";

export interface LoginFormInput {
    cnpj: string;
}

export const loginSchema = z.object({
    cnpj: z.custom<string>(((val: unknown) => {
        return typeof val === 'string' && validateCNPJ(val);
    }), 'O CNPJ enviado é invalido')
});

export interface LoggedUser {
    id: string
    cnpj: string
    nomeFantasia: string
    razaoSocial: string
}
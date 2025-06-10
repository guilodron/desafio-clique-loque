import { prismaClient } from '../../../utils/db.js';

export const loginService = async (cnpj: string) => {
    const user = await prismaClient.user.findFirst({
        where: {
            cnpj
        }
    });
    console.log(user);
    return user;
};
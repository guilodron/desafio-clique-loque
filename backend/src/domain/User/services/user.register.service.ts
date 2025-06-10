import { prismaClient } from '../../../utils/db.js';
import { UserRegisterInput } from '../user.schema.js';

export const registerService = async (input: UserRegisterInput) => {
    const user = await prismaClient.user.create({
        data: input
    });
    return user;
};
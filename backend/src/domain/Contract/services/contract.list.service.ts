import { prismaClient } from '../../../utils/db.js';

export const listContracts = async (userId: string) => {
    const contracts = await prismaClient.contract.findMany({
        where: {
            userId
        }
    });

    return contracts;
};
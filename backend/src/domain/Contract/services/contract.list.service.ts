import { prismaClient } from '../../../utils/db.js';
import { SendDataInput } from '../contract.schemas.js';

export const listContracts = async (userId: string) => {
    const contracts = await prismaClient.contract.findMany({
        where: {
            userId
        }
    });

    return contracts;
};

export const sendDataService = (files: {fileName: string, mimeType: string}[], fields: SendDataInput) => {
    console.log('Campos recebidos:' );
    console.log(fields);
    console.log('Arquivos recebidos:' );
    console.log(files);

    return `Solicitação ${fields.numeroNota} foi enviada com sucesso.`;
};
import { FastifyReply, FastifyRequest } from 'fastify';
import { listContracts, sendDataService } from './services/contract.list.service.js';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { SendDataInput } from './contract.schemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pump = promisify(pipeline);

export const getUserContracts = async (request: FastifyRequest<{ Params: {userId: string} }>, reply: FastifyReply) => {
    const { userId } = request.params;
    try {
        const contracts = await listContracts(userId);
        return reply.status(200).send(contracts);
    } catch (error) {
        return reply.status(500).send(error);
    }
};

export const sendData = async (request: FastifyRequest, reply: FastifyReply) => {
    const parts = request.parts();
    const files: { fileName: string, mimeType: string }[] = [];
    const fields: SendDataInput = {
            numeroNota: '',
            dataEmissao: '',
            dataVencimento: '',
            valor: ''
        };
        console.log('aquis im');
    for await (const part of parts) {
        if (part.type === 'file') {
            console.log('file');
            files.push({
                fileName: part.filename,
                mimeType: part.mimetype
            });
            const saveTo = fs.createWriteStream(`${__dirname}/files/${part.filename}`);
            console.log('part.file');
            console.log(part.file);
            
            await pump(part.file, saveTo);
        } else {
            fields[part.fieldname as keyof SendDataInput] = String(part.value);
        }
    }

     return reply.status(201).send(sendDataService(files, fields));

};
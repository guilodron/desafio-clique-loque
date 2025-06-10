import { FastifyReply, FastifyRequest } from 'fastify';
import { listContracts } from './services/contract.list.service.js';

export const getUserContracts = async (request: FastifyRequest<{ Params: {userId: string} }>, reply: FastifyReply) => {
    const { userId } = request.params;
    try {
        const contracts = await listContracts(userId);
        return reply.status(200).send(contracts);
    } catch (error) {
        return reply.status(500).send(error);
    }
};
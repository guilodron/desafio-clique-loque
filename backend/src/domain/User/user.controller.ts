import { FastifyReply, FastifyRequest } from 'fastify';
import { loginService } from './services/user.login.service.js';
import { UserLoginInput, UserRegisterInput } from './user.schema.js';
import { registerService } from './services/user.register.service.js';

export const login = async (request: FastifyRequest<{ Body: UserLoginInput }>, reply: FastifyReply) => {
    const { cnpj } = request.body;
    try {
        const user = await loginService(cnpj);
        if(user) {
            return reply.status(200).send(user);
        }
        return reply.status(404).send({
            message: 'usuario nao encontrado'
        });
    } catch (error) {
        return reply.status(500).send(error);
    }
};

export const register = async (request: FastifyRequest<{ Body: UserRegisterInput }>, reply: FastifyReply) => {
    const body = request.body;
    try {
        const user = await registerService(body);
        if(user) {
            return reply.status(200).send(user);
        }
        return reply.status(404).send({
            message: 'usuario nao encontrado'
        });
    } catch (error) {
        return reply.status(500).send(error);
    }
};

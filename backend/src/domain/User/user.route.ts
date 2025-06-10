import { FastifyInstance } from 'fastify';
import { login, register } from './user.controller.js';
import { userLoginInputSchema, userLoginOutputSchema, userRegisterInputSchema } from './user.schema.js';

export const userRoutes = (app: FastifyInstance) => {
    app.post('/login',
        {
            schema: {
                body: userLoginInputSchema,
                response: {
                    200: userLoginOutputSchema
                }
            }
        }
        , login);

    app.post('/register', {
        schema: {
            body: userRegisterInputSchema
        }
    }, register);
};
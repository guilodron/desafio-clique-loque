import { FastifyInstance } from 'fastify';
import { contractListSchema } from './contract.schemas.js';
import { getUserContracts } from './contract.controller.js';
export const contractRoutes = (app: FastifyInstance) => {
    app.get('/:userId',
        {
            schema: {
                params: contractListSchema
            }
        }
        , getUserContracts);

};
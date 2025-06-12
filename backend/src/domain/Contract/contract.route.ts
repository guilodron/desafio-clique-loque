import { FastifyInstance } from 'fastify';
import { contractListSchema } from './contract.schemas.js';
import { getUserContracts, sendData } from './contract.controller.js';
export const contractRoutes = (app: FastifyInstance) => {
    app.get('/:userId',
        {
            schema: {
                params: contractListSchema
            }
        }
        , getUserContracts);
    app.post('/sendData', {}, async (req, repply) => {
        return sendData(req,repply);
    });
};
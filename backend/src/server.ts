import { fastify } from 'fastify';
import { userRoutes } from './domain/User/user.route.js';
import { validatorCompiler, ZodTypeProvider, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { contractRoutes } from './domain/Contract/contract.route.js';
import cors from '@fastify/cors';

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(cors, {
  origin: '*'
});
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Fastify API',
            description: 'API documentation for Fastify application',
            version: '1.0.0'
        },
        servers: []
    }, 
    transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
});

app.register(userRoutes, { prefix: '/user' });
app.register(contractRoutes, { prefix: '/contracts' });

app.listen({ port: 3000 })
    .then(() => {
        console.log('server running!');
    });
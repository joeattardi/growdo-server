import Fastify from 'fastify';
import { initializeDatabase } from './db';
import { createLogger } from './logger';

const logger = createLogger('server');
// import { getTodos } from './db';

const server = Fastify();

// server.get('/todos', async (request, reply) => {
//     const todos = getTodos();
//     return todos;
// });

async function start() {
    initializeDatabase();
    await server.listen({ port: 3000 });
    logger.info('Server listening on port 3000');
}

start();

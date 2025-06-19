import Fastify from 'fastify';
import { initializeDatabase } from './db';
import { createLogger } from './logger';
import { todos } from './routes/todos';

const logger = createLogger('server');

async function start() {
    initializeDatabase();

    const server = Fastify();
    server.register(todos, { prefix: '/api' });

    await server.listen({ port: 3000 });
    logger.info('Server listening on port 3000');
}

start();

import Fastify from 'fastify';
import { initializeDatabase } from './db';
import { createLogger } from './logger';
import { getTodos, createTodo } from './db/todos';
import { Todo } from './db/types';

const logger = createLogger('server');

const server = Fastify();

server.get('/todos', async (request, reply) => {
    const todos = getTodos();
    return todos;
});

server.post('/todos', async (request, reply) => {
    createTodo(request.body as Todo);
    reply.code(201);
});

async function start() {
    initializeDatabase();
    await server.listen({ port: 3000 });
    logger.info('Server listening on port 3000');
}

start();

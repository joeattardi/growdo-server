import Fastify from 'fastify';
import { initializeDatabase } from './db';
// import { getTodos } from './db';

const server = Fastify();

// server.get('/todos', async (request, reply) => {
//     const todos = getTodos();
//     return todos;
// });

async function start() {
    initializeDatabase();
    await server.listen({ port: 3000 });
}

start();

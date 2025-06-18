import Fastify from 'fastify';

const server = Fastify({
    logger: true
});

server.get('/', async (request, reply) => {
    return { hello: 'world' };
});

async function start() {
    await server.listen({ port: 3000 });
    server.log.info(`Server listening on ${server.server.address()}`);
}

start();

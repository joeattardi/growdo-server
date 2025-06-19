import { FastifyPluginAsync } from 'fastify';
import { createTodo, getTodo, getTodos } from '../db/todos';
import { Todo } from '../db/types';
import { todoSchema } from '../schemas/todo';

type GetTodoParams = { id: string };

export const todos: FastifyPluginAsync = async (server, options) => {
    server.get('/todos', () => {
        const todos = getTodos();
        return todos;
    });

    server.post('/todos', {
        schema: {
            body: todoSchema
        }
    }, (request, reply) => {
        const todo = createTodo(request.body as Todo);

        if (todo) {
            return reply
                .code(201)
                .header('Location', `/api/todos/${todo.id}`)
                .send(todo);
        }

        reply.code(500).send({ error: 'Failed to create todo' });
    });

    server.get<{ Params: GetTodoParams }>('/todos/:id', (request, reply) => {
        const todo = getTodo(Number(request.params.id));
        if (!todo) {
            reply.code(404).send({ error: 'Todo not found' });
        } else {
            reply.send(todo);
        }
    });
};

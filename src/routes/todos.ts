import { FastifyPluginAsync } from 'fastify';
import { createTodo, getTodo, getTodos, updateTodo, deleteTodo } from '../db/todos';
import { Todo } from '../db/types';
import { todoSchema } from '../schemas/todo';

export const todos: FastifyPluginAsync = async (server, options) => {
    server.get('/todos', () => {
        const todos = getTodos();
        return todos;
    });

    server.post(
        '/todos',
        {
            schema: {
                body: todoSchema
            }
        },
        (request, reply) => {
            const todo = createTodo(request.body as Todo);

            if (todo) {
                return reply.code(201).header('Location', `/api/todos/${todo.id}`).send(todo);
            }

            reply.code(500).send({ error: 'Failed to create todo' });
        }
    );

    server.get<{ Params: { id: string } }>('/todos/:id', (request, reply) => {
        const todo = getTodo(Number(request.params.id));
        if (!todo) {
            reply.code(404).send({ error: 'Todo not found' });
        } else {
            reply.send(todo);
        }
    });

    server.put<{ Params: { id: string } }>(
        '/todos/:id',
        {
            schema: {
                body: todoSchema
            }
        },
        (request, reply) => {
            const todo = getTodo(Number(request.params.id));
            if (!todo) {
                reply.code(404).send({ error: 'Todo not found' });
            } else {
                const updatedTodo = updateTodo(Number(request.params.id), request.body as Todo);
                reply.code(200).send(updatedTodo);
            }
        }
    );

    server.delete<{ Params: { id: string } }>('/todos/:id', (request, reply) => {
        if (deleteTodo(Number(request.params.id))) {
            return reply.code(204).send();
        }

        reply.code(404).send({ error: 'Todo not found' });
    });
};

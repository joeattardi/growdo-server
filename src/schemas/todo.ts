export const todoSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        completed: { type: 'boolean' }
    },
    required: ['title'],
    additionalProperties: false
};

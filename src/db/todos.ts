import { db } from './index';
import { Todo } from './types';

export function getTodos() {
    const rows = db.prepare('SELECT * FROM todos').all();

    const todos: Todo[] = rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        completed: row.completed === 1
    }));
    
    return todos;
}

export function getTodo(id: number) {
    const row: any = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

    if (!row) {
        return null;
    }

    const todo: Todo = {
        id: row.id,
        title: row.title,
        description: row.description,
        completed: row.completed === 1
    };

    return todo;
}

export function createTodo(todo: Todo) {
    const { lastInsertRowid } = db.prepare('INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)').run(
        todo.title,
        todo.description,
        todo.completed ? 1 : 0
    );

    return getTodo(lastInsertRowid as number)
}

export function updateTodo(id: number, todo: Todo) {
    db.prepare('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?').run(
        todo.title,
        todo.description,
        todo.completed ? 1 : 0,
        id
    );

    return getTodo(id);
}

export function deleteTodo(id: number) {
    const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    return result.changes === 1;
}

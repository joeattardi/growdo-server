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

export function createTodo(todo: Todo) {
    db.prepare('INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)').run(
        todo.title,
        todo.description,
        todo.completed ? 1 : 0
    );
}

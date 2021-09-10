/** @format */
import { v4 as uuidv4 } from 'uuid';

export function TodoStore() {
	return {
		todos: [],
		addTodo(todo) {
			if (todo !== '') {
				this.todos.push({
					title: todo,
					id: uuidv4(),
				});
			}
		},
		removeTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		updateTodo(id, text) {
			this.todos.map((todo) => {
				if (todo.id === id) {
					todo.title = text;
				}
				return this.todos;
			});
		},
	};
}

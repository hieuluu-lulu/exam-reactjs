/** @format */

import React from 'react';
import { useLocalObservable } from 'mobx-react';
import { TodoStore } from './TodoStore';

const TodoContext = React.createContext(null);

export const TodoProvider = ({ children }) => {
	const todoStore = useLocalObservable(TodoStore);
	return <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => React.useContext(TodoContext);

/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TodoProvider } from './MobX-Store/TodoContext';

ReactDOM.render(
	<TodoProvider>
		<App />
	</TodoProvider>,
	document.getElementById('root'),
);



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { loadTodos } from './store/todoSlice';

const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
    const todos = JSON.parse(storedTodos);
    store.dispatch(loadTodos(todos)); 
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

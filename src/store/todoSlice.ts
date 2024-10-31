

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    task: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
            
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
          
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
               
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        markCompleted: (state, action: PayloadAction<string>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = true;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        loadTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, markCompleted, loadTodos } = todoSlice.actions;
export default todoSlice.reducer;

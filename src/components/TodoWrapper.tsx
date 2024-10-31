// src/components/TodoWrapper.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, deleteTodo, updateTodo, markCompleted } from '../store/todoSlice';

const TodoWrapper = () => {
    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState(''); // New variable for editing task
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low'); // Set default priority to low
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [filteredStatus, setFilteredStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    // Load todos from local storage on component mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            JSON.parse(savedTodos).forEach((todo: any) => {
                dispatch(addTodo(todo));
            });
        }
    }, [dispatch]);

    // Save todos to local storage whenever the todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            const newTodo = {
                id: new Date().getTime().toString(),
                task,
                priority, // Use the priority set by the user
                completed: false,
            };
            dispatch(addTodo(newTodo));
            setTask('');
            setPriority('low'); // Reset priority to low after adding
        }
    };

    const handleEditTodo = (todo: any) => {
        setEditingTodoId(todo.id);
        setEditTask(todo.task); // Set the editTask for editing
        setPriority(todo.priority); // Set the priority for editing
    };

    const handleUpdateTodo = () => {
        if (editingTodoId) {
            const updatedTodo = {
                id: editingTodoId,
                task: editTask, // Use editTask for updating
                priority, // Include the updated priority
                completed: false, // Keep completed status unchanged on edit
            };
            dispatch(updateTodo(updatedTodo));
            resetEditing();
        }
    };

    const resetEditing = () => {
        setEditingTodoId(null);
        setEditTask(''); // Reset editTask when editing is cancelled
        setPriority('low'); // Reset priority to low when editing is cancelled
    };

    const handleMarkCompleted = (id: string) => {
        dispatch(markCompleted(id));
    };

    const filterTodos = (status: 'all' | 'completed' | 'incomplete') => {
        return todos.filter(todo => {
            if (status === 'completed') return todo.completed;
            if (status === 'incomplete') return !todo.completed;
            return true; // 'all'
        });
    };

    return (
        <div className='todoWrapper'>
            <form onSubmit={handleAddTodo}>
                <input
                    className='todo-input'
                    type="text"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <select className="drop-down" onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')} value={priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button className='add-btn' type="submit">Add Todo</button> {/* Always show "Add Todo" */}
            </form>

            <div className='filter-status'>
                <button className='filter-btns' onClick={() => setFilteredStatus('all')}>All</button>
                <button className='filter-btns' onClick={() => setFilteredStatus('completed')}>Completed</button>
                <button className='filter-btns' onClick={() => setFilteredStatus('incomplete')}>Incomplete</button>
            </div>
            
            <div className='todo-items'>
            {filterTodos(filteredStatus).map((todo) => (
                <div key={todo.id} className={`Todo ${todo.completed ? 'completed' : 'incompleted'} todo-item`}>
                    {editingTodoId === todo.id ? (
                        <div>
                            <input
                                type="text"
                                value={editTask} // Use editTask for the input field
                                onChange={(e) => setEditTask(e.target.value)} // Update editTask only for the editing todo
                            />
                            <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button onClick={handleUpdateTodo}>Update</button> {/* Update button appears only during editing */}
                        </div>
                    ) : (
                        <span className={todo.completed ? 'completed' : 'incompleted'}>
                            {todo.task} - Priority: <strong>{todo.priority}</strong>
                        </span>
                    )}
                    <button onClick={() => handleMarkCompleted(todo.id)}>Completed</button>
                    {!editingTodoId && ( // Only show edit button if not currently editing any todo
                        <button onClick={() => handleEditTodo(todo)}>Edit</button>
                    )}
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default TodoWrapper;

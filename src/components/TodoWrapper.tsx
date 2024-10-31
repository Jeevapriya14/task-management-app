// src/components/TodoWrapper.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, deleteTodo, updateTodo, markCompleted } from '../store/todoSlice';

const TodoWrapper = () => {
    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState(''); 
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low'); 
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [filteredStatus, setFilteredStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

   
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            JSON.parse(savedTodos).forEach((todo: any) => {
                dispatch(addTodo(todo));
            });
        }
    }, [dispatch]);

    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            const newTodo = {
                id: new Date().getTime().toString(),
                task,
                priority,
                completed: false,
            };
            dispatch(addTodo(newTodo));
            setTask('');
            setPriority('low'); 
        }
    };

    const handleEditTodo = (todo: any) => {
        setEditingTodoId(todo.id);
        setEditTask(todo.task); 
        setPriority(todo.priority); 
    };

    const handleUpdateTodo = () => {
        if (editingTodoId) {
            const updatedTodo = {
                id: editingTodoId,
                task: editTask, 
                priority, 
                completed: false, 
            };
            dispatch(updateTodo(updatedTodo));
            resetEditing();
        }
    };

    const resetEditing = () => {
        setEditingTodoId(null);
        setEditTask(''); 
        setPriority('low'); 
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
                                value={editTask} 
                                onChange={(e) => setEditTask(e.target.value)} 
                            />
                            <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button onClick={handleUpdateTodo}>Update</button> 
                        </div>
                    ) : (
                        <span className={todo.completed ? 'completed' : 'incompleted'}>
                            {todo.task} - Priority: <strong>{todo.priority}</strong>
                        </span>
                    )}
                    <button onClick={() => handleMarkCompleted(todo.id)}>Completed</button>
                    {!editingTodoId && ( 
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

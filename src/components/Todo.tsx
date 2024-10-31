

import React, { useState } from 'react';
import { Todo as TodoType } from '../types'; 

interface TodoProps {
    todo: TodoType;
    deleteTodo: (id: string) => void;
    toggleEditing: (id: string) => void;
    editTodo: (payload: { id: string; task: string; priority: "low" | "medium" | "high" }) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, deleteTodo, toggleEditing, editTodo }) => {
    const [task, setTask] = useState(todo.task);
    const [priority, setPriority] = useState(todo.priority);

    const handleEdit = () => {
        editTodo({ id: todo.id, task, priority });
        setTask(''); 
        setPriority('low'); 
    };

    return (
        <div>
            {todo.isEditing ? (
                <>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => toggleEditing(todo.id)}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{todo.task} - {todo.priority}</span>
                    <button onClick={() => toggleEditing(todo.id)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default Todo;

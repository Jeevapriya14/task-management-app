import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const dispatch = useDispatch();

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
      setPriority("medium"); 
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

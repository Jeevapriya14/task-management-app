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
      // Create a new todo object with required properties
      const newTodo = {
        id: new Date().getTime().toString(), // Generate a unique string ID
        task,
        priority,
        completed: false, // Set completed to false by default
      };
      dispatch(addTodo(newTodo)); // Dispatch the new todo
      setTask(''); // Clear input
      setPriority("medium"); // Reset priority
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

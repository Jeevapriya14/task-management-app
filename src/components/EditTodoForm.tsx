import React, { useState } from 'react';

interface EditTodoFormProps {
  editTodo: (task: string, id: string) => void;
  task: { id: string; task: string };
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder='Update task'
      />
      <button type="submit" className='todo-btn'>Edit Task</button>
    </form>
  );
};

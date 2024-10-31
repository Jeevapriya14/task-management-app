// src/types.ts

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  priority: "low" | "medium" | "high";
  
}

export interface TodoProps {
  todo: Todo; // Use the defined Todo type
  deleteTodo: (id: string) => void;
  toggleEditing: (id: string) => void;
  editTodo: (payload: { id: string; task: string; priority: "low" | "medium" | "high" }) => void;
}

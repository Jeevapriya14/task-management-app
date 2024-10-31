

export const loadTodos = () => {
    try {
        const serializedTodos = localStorage.getItem('todos');
        return serializedTodos ? JSON.parse(serializedTodos) : [];
    } catch (e) {
        console.error("Could not load todos", e);
        return [];
    }
};

export const saveTodos = (todos: any[]) => {
    try {
        const serializedTodos = JSON.stringify(todos);
        localStorage.setItem('todos', serializedTodos);
    } catch (e) {
        console.error("Could not save todos", e);
    }
};

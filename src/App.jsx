import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './contexts/Todocontext.js';
import Form from './componets/Form.jsx';
import Item from './componets/Item.jsx';

function App() {
  const [todos, setTodos] = useState([]);

  // Add new todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // Update existing todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos?.length) setTodos(storedTodos);
  }, []);

  // Save todos to localStorage on change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-500 py-10 px-4">
        <div className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-[#05445E] mb-6">
            Make Your Plan For The Day
          </h1>

          {/* Form */}
          <Form />

          {/* Todos */}
          <div className="mt-6 space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <Item key={todo.id} todo={todo} />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No tasks yet. Start by adding one!
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

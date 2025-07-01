import React, { useState } from 'react';
import { useTodo } from '../contexts/Todocontext';

function Item({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        if (todoMsg.trim()) {
            updateTodo(todo.id, { ...todo, todo: todoMsg.trim() });
            setIsTodoEditable(false);
        }
    };

    const toggleCompleted = () => toggleComplete(todo.id);

    return (
        <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border border-gray-200 rounded-lg p-4 mt-4 transition-all shadow-md ${
                todo.completed ? "bg-rose-100" : "bg-teal-100"
            }`}
        >
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer accent-green-600"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <input
                    type="text"
                    className={`w-full text-lg sm:text-xl bg-transparent outline-none transition-all ${
                        isTodoEditable
                            ? "border-b border-gray-400 focus:border-green-500"
                            : "border-none"
                    } ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
            </div>
            <div className="flex gap-2 shrink-0">
                <button
                    className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable(true);
                        }
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "Save" : "Edit"}
                </button>
                <button
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-all"
                    onClick={() => deleteTodo(todo.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default Item;

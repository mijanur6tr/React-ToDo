import React, { useState } from 'react';
import { useTodo } from '../contexts/Todocontext';

function Form() {
    const [todoMsg, setTodoMsg] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todoMsg.trim()) return;

        addTodo({ todo: todoMsg.trim(), completed: false });
        setTodoMsg("");
    };

    return (
        <form 
            onSubmit={add} 
            className="flex flex-col sm:flex-row items-center  sm:items-stretch mt-6 w-full gap-3"
        >
            <input
                type="text"
                placeholder="Write a new task..."
                className="w-full flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
            />
            <button
                type="submit"
                className="w-full sm:w-auto sm:ml-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-lg font-semibold transition-all shadow-md"
            >
                Add Task
            </button>
        </form>
    );
}

export default Form;

import React,{useState} from 'react'
import { useTodo } from '../contexts/Todocontext';

/**
* @author
* @function Item
**/

function Item({ todo }) {
    const [isTodoEditable,setIsTodoEditable] = useState(false)
    const [todoMsg,setTodoMsg] = useState(todo.todo)
    const{updateTodo,deleteTodo,toggleComplete} = useTodo()

    const editTodo = ()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = ()=>{
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-white ${
                todo.completed ? "bg-[#7c5043]" : "bg-[#233e45] "
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-13 text-white h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-[#59981A] hover:bg-[#81B622] shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "SAVE" : "EDIT"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-16 h-8 bg-[#59981A] hover:bg-[#81B622]  text-white rounded-lg text-sm border border-black/10 justify-center items-center  shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                REMOVE
            </button>
        </div>
    );
}

export default Item;

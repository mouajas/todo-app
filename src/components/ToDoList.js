import React, { useEffect, useState } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) return JSON.parse(savedTasks);
    }, []);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleKeyEnter(event) {
        if (event.key === "Enter")
            addTask(event);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function editTask() {
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    return (
        <div className='to-do-list'>
            <h1>To Do List</h1>

            <div className="input">
                <input
                    type='text'
                    placeholder='Add new task'
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyEnter}
                />

                <button
                    className='add-button'
                    onClick={addTask}>
                    <FaPlus />
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'>{task}</span>

                        <button
                            className='edit-button'
                            onClick={() => (editTask(index))}>
                            <MdEdit className='trash-icon' />
                        </button>

                        <button
                            className='delete-button'
                            onClick={() => (deleteTask(index))}>
                            <FaTrashCan className='trash-icon' />
                        </button>

                    </li>
                )}
            </ol>
        </div>
    );
}

export default ToDoList
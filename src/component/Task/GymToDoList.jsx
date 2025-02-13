import { useState } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const GymToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const exerciseSuggestions = [
    "Push-ups",
    "Squats",
    "Deadlifts",
    "Bench Press",
    "Pull-ups",
    "Plank (60 sec)",
    "Jump Rope (5 min)",
    "Bicep Curls",
    "Leg Press",
    "Treadmill (20 min)",
  ];

  const addTask = (task) => {
    const taskText = task || newTask.trim();
    if (taskText !== "") {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-32 max-w-md mx-auto bg-white dark:bg-gray-900 p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">🏋️ Gym To-Do List</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={() => addTask()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          <FaPlus />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">🔥 Quick Add Exercises:</h3>
        <div className="grid grid-cols-2 gap-2">
          {exerciseSuggestions.map((exercise, index) => (
            <button
              key={index}
              onClick={() => addTask(exercise)}
              className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {exercise}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 rounded-lg ${
              task.completed ? "bg-green-100 line-through dark:bg-green-800" : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <span className="dark:text-white">{task.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(index)}
                className="text-green-600 hover:text-green-800"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GymToDoList;

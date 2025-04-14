import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";

const GymToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    gender: "",
    experience: ""
  });

  const [showMotivation, setShowMotivation] = useState(false);

  const exerciseSuggestions = {
    beginner: [
      "Push-ups (3 sets x 10 reps) - 3",
      "Bodyweight Squats (3 sets x 12 reps) - 3",
      "Plank (3 sets x 30 sec) - 2",
      "Jump Rope (5 min) - 5",
      "Wall Push-ups (3 sets x 12 reps) - 3",
      "Walking Lunges (3 sets x 10 each leg) - 3",
      "Mountain Climbers (3 sets x 30 sec) - 2",
      "Bird Dogs (3 sets x 10 each side) - 3",
      "Cat-Cow Stretch (2 min) - 2",
      "Arm Circles (3 sets x 20 each direction) - 2"
    ],
    intermediate: [
      "Weighted Push-ups (4 sets x 12 reps) - 4",
      "Barbell Squats (4 sets x 10 reps) - 5",
      "Deadlifts (4 sets x 8 reps) - 5",
      "Pull-ups (4 sets x 8 reps) - 4",
      "Bench Press (4 sets x 10 reps) - 5",
      "Romanian Deadlifts (4 sets x 12 reps) - 4",
      "Dumbbell Shoulder Press (4 sets x 10 reps) - 4",
      "Plank with Shoulder Taps (4 sets x 30 sec) - 3",
      "Jump Squats (4 sets x 15 reps) - 3",
      "Russian Twists (4 sets x 20 each side) - 3"
    ],
    advanced: [
      "Weighted Pull-ups (5 sets x 8 reps) - 5",
      "Barbell Deadlifts (5 sets x 5 reps) - 6",
      "Bench Press (5 sets x 5 reps) - 5",
      "Squats (5 sets x 5 reps) - 6",
      "Military Press (5 sets x 6 reps) - 5",
      "Romanian Deadlifts (5 sets x 8 reps) - 5",
      "Weighted Dips (5 sets x 10 reps) - 4",
      "Box Jumps (5 sets x 10 reps) - 4",
      "Kettlebell Swings (5 sets x 20 reps) - 4",
      "Burpees (5 sets x 15 reps) - 4"
    ]
  };
  const motivationalQuotes = [
    "Push yourself, because no one else is going to do it for you.",
    "No pain, no gain. Shut up and train.",
    "Success starts with self-discipline.",
    "The only bad workout is the one that didn’t happen.",
    "Fitness is not about being better than someone else. It’s about being better than you used to be.",
    "Your body can stand almost anything. It’s your mind you have to convince.",
    "Train insane or remain the same.",
    "Believe in yourself and all that you are.",
    "Don’t limit your challenges. Challenge your limits.",
    "Sweat is just fat crying."
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const heightInCm = (parseInt(formData.heightFeet) * 30.48) + (parseInt(formData.heightInches) * 2.54);
    setUserProfile({
      ...formData,
      height: heightInCm
    });
  };

  const getExperienceLevel = (years) => {
    if (years < 1) return "beginner";
    if (years < 3) return "intermediate";
    return "advanced";
  };

  const addTask = (task) => {
    const taskText = task || newTask.trim();
    if (taskText !== "") {
      const durationMatch = taskText.match(/- (\d+)/); // Match time after hyphen
      const duration = durationMatch ? parseInt(durationMatch[1]) : 2;
      setTasks([...tasks, { text: taskText, completed: false, time: duration }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setShowMotivation(randomQuote);
    } else {
      setShowMotivation(false);
    }
  }, [tasks]);
  

  const totalTime = tasks.reduce((sum, task) => sum + (task.completed ? task.time : 0), 0);

  return (
    <div className="mt-28 w-full h-auto flex items-center justify-center flex-col px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 sm:py-12 md:py-14 lg:py-16">
      <h6 className="text-lg font-medium text-gray-200 flex items-center gap-x-2 mb-6">
        <BiDumbbell className="w-10 h-10 -rotate-45 text-primary" />
        <h1 className="text-4xl font-bold text-black dark:text-white font-serif flex">
          Your <span className="ml-2 text-primary">Workout</span> Plan
        </h1>
      </h6>

      {!userProfile ? (
        <div className="w-full max-w-4xl bg-white dark:bg-dark rounded-2xl shadow-lg shadow-primary p-8">
          <h2 className="text-3xl font-serif mb-6 dark:text-white text-black text-center">Your <span className="text-primary font-sans">Today's</span> Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="120"
                  className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium mb-1 dark:text-white">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base text-black dark:!text-white font-medium"
                >
                  <option value="" className="dark:!text-black">Select Gender</option>
                  <option value="male" className="dark:!text-black">Male</option>
                  <option value="female" className="dark:!text-black">Female</option>
                  <option value="other" className="dark:!text-black">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="500"
                  className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Height</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="heightFeet"
                    value={formData.heightFeet}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="8"
                    placeholder="Feet"
                    className="w-1/2 h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
                  />
                  <input
                    type="number"
                    name="heightInches"
                    value={formData.heightInches}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="11"
                    placeholder="Inches"
                    className="w-1/2 h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
                max="50"
                className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/80 transition duration-300"
            >
              Generate Workout Plan
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white dark:bg-dark rounded-2xl shadow-lg shadow-primary p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Welcome, {userProfile.name}!</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1)} • {userProfile.age} years • {userProfile.heightFeet}'{userProfile.heightInches}" • {userProfile.weight}kg
              </p>
            </div>
            <button
              onClick={() => setUserProfile(null)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300"
            >
              Edit Profile
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Add a new exercise..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full h-12 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:ring-2 focus:ring-primary rounded-md text-base dark:text-white text-black font-medium"
            />
            <button
              onClick={() => addTask()}
              className="bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/80 transition duration-300"
            >
              <FaPlus />
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              🔥 Recommended Exercises for {getExperienceLevel(parseInt(userProfile.experience))} level:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {exerciseSuggestions[getExperienceLevel(parseInt(userProfile.experience))].map((exercise, index) => (
                <button
                  key={index}
                  onClick={() => addTask(exercise)}
                  className="bg-gray-200 dark:bg-black text-sm px-3 py-2 rounded-lg shadow-md shadow-primary hover:border-primary transition-transform duration-300 hover:scale-105 dark:text-white"
                >
                  {exercise}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg transition duration-300 ${task.completed
                    ? "bg-green-100 dark:bg-green-900/30 line-through"
                    : "bg-gray-100 dark:bg-black hover:bg-gray-200 "
                  }`}
              >
                <span className="dark:text-white">
                  {task.text} <span className="text-xs text-gray-500">[{task.time} min]</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(index)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition duration-300"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right text-base font-semibold dark:text-white">
            ⏱️ Total Time: {totalTime} minutes
          </div>

          {showMotivation && (
            <div className="mt-8 text-center p-6 bg-green-100 dark:bg-green-800 rounded-xl shadow-md shadow-primary transition-all">
              <h3 className="text-2xl font-bold text-green-800 dark:text-white mb-2">
                🎉 Today's Task Completed!
              </h3>
              <p className="text-md text-gray-800 dark:text-gray-200 italic">
                “{showMotivation}”
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default GymToDoList;
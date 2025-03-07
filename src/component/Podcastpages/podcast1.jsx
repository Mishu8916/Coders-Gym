import React from "react";

const sessions = [
  {
    title: "Healthy Weight Loss",
    sessions: "6 sessions",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Balanced Eating",
    sessions: "5 sessions",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Sleep & Recovery",
    sessions: "5 sessions",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Habits & Consistency",
    sessions: "5 sessions",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "All about stress",
    sessions: "5 sessions",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Diets & Eating Patterns",
    sessions: "5 sessions",
    image: "https://via.placeholder.com/150",
  },
];

const podcast1 = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">One Rep at a Time</h1>
      <p className="text-center mb-8">
        Join podcast host, Deepak Gopalakrishnan aka Chuck, in his quest to build a fitness habit for life. Tune in every weekday for invigorating discussions on curated health & fitness topics, including interviews with fitness & nutrition experts, sleep scientists, even former Olympians!
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={session.image} alt={session.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-4">{session.title}</h2>
            <p className="text-gray-600">{session.sessions}</p>
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center">
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default podcast1;

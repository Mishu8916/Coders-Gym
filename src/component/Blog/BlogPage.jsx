import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import img1 from "../../assets/blog/fitn.avif";
import img2 from "../../assets/blog/yoga.avif";
import img3 from "../../assets/blog/gym.avif";
import img4 from "../../assets/blog/Aerobics.avif";
import img5 from "../../assets/blog/Boxing.avif";
import img6 from "../../assets/blog/Cycling.avif";
import img7 from "../../assets/blog/Weight Lifting.avif";
import img8 from "../../assets/blog/zumba.avif";

const sections = [
    { title: "Fitness", image: img1 },
    { title: "Yoga", image: img2 },
    { title: "Gym", image: img3 },
    { title: "Aerobics", image: img4 },
    { title: "Boxing", image: img5 },
    { title: "Cycling", image: img6 },
    { title: "Weight Lifting", image: img7 },
    { title: "Zumba", image: img8 },
];

const content = {
    fitness: "Fitness isn’t just about looking good – it’s about feeling good and maintaining a balanced lifestyle. Regular physical activity has numerous benefits, including enhanced mood, increased energy levels, and a lower risk of chronic diseases like heart disease, diabetes, and obesity. A good fitness regimen incorporates both aerobic exercises, which improve cardiovascular health, and strength training exercises, which build muscle mass and increase metabolism. Fitness is for everyone, regardless of age or fitness level. Starting with small, achievable goals can help make fitness a sustainable and enjoyable part of your daily routine.\n\n" +
             "Key Tips for Fitness:\n" +
             "- Start with a warm-up and cool-down to prevent injuries.\n" +
             "- Include both cardio and strength exercises in your routine.\n" +
             "- Stay consistent, but listen to your body and allow for rest and recovery.\n" +
             "- Stay hydrated and fuel your body with a balanced diet.",

    yoga: "Yoga is more than just a physical workout – it’s a holistic practice that combines breathwork, movement, and meditation to create balance in both body and mind. There are many types of yoga, ranging from gentle styles like Hatha and Yin Yoga to more vigorous practices like Vinyasa and Ashtanga. Yoga’s emphasis on mindfulness helps reduce stress, promote mental clarity, and improve overall well-being. It’s also an excellent way to improve flexibility and strength while fostering inner peace.\n\n" +
          "Benefits of Yoga:\n" +
          "- Enhances flexibility and joint mobility.\n" +
          "- Reduces stress and anxiety through mindfulness and relaxation.\n" +
          "- Improves posture and core strength.\n" +
          "- Promotes better sleep and mental clarity.",

    gym: "The gym is a hub for a wide variety of fitness activities, from cardiovascular exercises on treadmills and stationary bikes to strength training with dumbbells, barbells, and resistance machines. Many gyms also offer group classes such as spinning, yoga, or high-intensity interval training (HIIT). Whether you’re looking to lose weight, build muscle, or just stay active, a gym provides all the resources you need. The environment also encourages social interaction and motivation, making it easier to stay committed to your fitness goals.\n\n" +
         "Tips for a Successful Gym Experience:\n" +
         "- Set clear fitness goals (strength, weight loss, endurance, etc.).\n" +
         "- Start with exercises that match your current fitness level and progress over time.\n" +
         "- Work with a trainer if you’re new to using gym equipment or need guidance.\n" +
         "- Don’t forget to stretch before and after your workouts.",

    aerobics: "Aerobic exercise, also known as cardio, involves continuous and rhythmic movements that increase your heart rate and improve cardiovascular health. Aerobics can include activities like running, cycling, swimming, dancing, or even hiking. These exercises are perfect for burning calories, improving endurance, and keeping your heart healthy. They also help reduce stress, improve mood, and boost overall stamina. Aerobics can be done solo or in a group setting, with classes often incorporating fun music and choreographed routines.\n\n" +
              "Aerobics for Better Health:\n" +
              "- Improves heart and lung function.\n" +
              "- Boosts metabolism and helps with weight management.\n" +
              "- Reduces the risk of chronic conditions like hypertension and diabetes.\n" +
              "- Increases endurance and stamina over time.",

    boxing: "Boxing isn’t just a sport; it’s an excellent full-body workout. It requires strength, endurance, speed, and mental focus. Boxing improves cardiovascular health, tones muscles, and increases overall fitness. In addition to physical benefits, boxing also teaches discipline, perseverance, and mental resilience. It’s a fantastic stress reliever – the combination of punching and footwork allows you to channel energy into each movement. Boxing workouts typically include shadow boxing, bag work, and sparring, along with strength and conditioning exercises.\n\n" +
            "Why Try Boxing:\n" +
            "- Provides a total-body workout that improves strength, endurance, and agility.\n" +
            "- Helps relieve stress and improve focus.\n" +
            "- Builds confidence and mental toughness.\n" +
            "- Can aid in weight loss by burning calories and toning muscles.",

    cycling: "Cycling is one of the most popular forms of low-impact cardiovascular exercise. It can be done outdoors on a bike trail or road, or indoors using a stationary bike. Cycling improves cardiovascular health, strengthens leg muscles, and can help with weight loss. Whether you cycle for fun or as a serious workout, it’s a fantastic way to stay active while enjoying the outdoors. Group cycling classes or spinning classes at the gym provide an added element of motivation with instructors guiding you through different cycling intensities.\n\n" +
             "Benefits of Cycling:\n" +
             "- Low-impact exercise that’s easy on the joints.\n" +
             "- Boosts cardiovascular fitness and leg strength.\n" +
             "- Great for weight loss and improving endurance.\n" +
             "- Can be done indoors or outdoors for variety.",

    "weight lifting": "Weight lifting, also known as strength training, is the practice of lifting weights to increase muscle mass and improve strength. This type of exercise helps to build muscle, enhance metabolism, and improve bone density. Weight lifting isn’t just for bodybuilders – it’s beneficial for anyone looking to improve their overall fitness. Lifting weights helps prevent muscle loss as you age, increases functional strength, and supports weight management. Incorporating both compound movements (like squats and deadlifts) and isolation exercises (like bicep curls and triceps extensions) can create a balanced routine.\n\n" +
                      "Key Advantages of Weight Lifting:\n" +
                      "- Builds lean muscle mass and burns fat.\n" +
                      "- Boosts metabolism and increases strength.\n" +
                      "- Improves bone density and reduces the risk of osteoporosis.\n" +
                      "- Enhances body posture and stability.",

    zumba: "Zumba is a fun, high-energy dance workout set to Latin and international music. The dance routines are easy to follow and combine elements of cardio, muscle conditioning, balance, and flexibility. Zumba provides a full-body workout while helping you burn calories, tone muscles, and improve cardiovascular health. What sets Zumba apart from other workouts is its focus on fun and enjoyment, which makes it easier to stick with over time. Zumba classes can vary in intensity, so there's something for every fitness level.\n\n" +
           "Benefits of Zumba:\n" +
           "- Provides an effective full-body workout.\n" +
           "- Burns calories and improves cardiovascular health.\n" +
           "- Boosts mood and reduces stress through upbeat music and movement.\n" +
           "- Accessible to people of all fitness levels and ages."
};


const BlogPage = () => {
    const [search, setSearch] = useState("");
    const sectionRefs = useRef({});

    const handleSearch = () => {
        const searchKey = search.toLowerCase();
        const foundSection = sections.find((section) =>
            section.title.toLowerCase().includes(searchKey)
        );

        if (foundSection && sectionRefs.current[foundSection.title]) {
            sectionRefs.current[foundSection.title].scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="mt-36 px-6 max-w-screen-xl mx-auto">
            <h1 className="text-5xl font-serif text-center mb-6 dark:text-primary ">Fitness At Your Screen</h1>
            <div className="flex items-center border rounded-lg p-2 bg-white w-80 mx-auto shadow-md shadow-primary">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-1 outline-none text-black text-sm "
                />
                <button onClick={handleSearch} className="p-1">
                    <FaSearch className="text-gray-600 text-sm" />
                </button>
            </div>
            <div className="space-y-12">
                {sections.map(({ title, image }, index) => (
                    <div
                        key={index}
                        ref={(el) => (sectionRefs.current[title] = el)}
                        id={title.toLowerCase()}
                        className="w-full px-6"
                    >
                        <h2 className="text-3xl font-serif dark:text-primary mb-4 ">{title}</h2>
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl shadow-primary"
                        />
                        <p className="dark:text-white text-black leading-relaxed text-xl mt-4">{content[title.toLowerCase()]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;

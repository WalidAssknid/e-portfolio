import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EngCourses = () => {
  const [activeYear, setActiveYear] = useState(0);

  const coursesData = [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "Semester 5",
          note: "Each UE (Teaching Unit) is worth 5 ECTS credits",
          courses: [
            "Soft & Human Skills",
            "Integration and Applications - Probabilities",
            "Imperative Programming",
            "Numerical Analysis and Statistics",
            "Automation and Data Analysis",
            "Modeling and Architecture",
            "Support UE"
          ]
        },
        {
          semester: "Semester 6",
          note: "Each UE (Teaching Unit) is worth 5 ECTS credits",
          courses: [
            "Soft & Human Skills",
            "Telecommunications and Signal Processing",
            "Networks",
            "Scientific Computing and Machine Learning",
            "Object Technology",
            "Architecture and Systems",
            "Support UE"
          ]
        }
      ]
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "Semester 7",
          track: "Networks",
          note: "Each UE (Teaching Unit) is worth 5 ECTS credits",
          courses: [
            "Digital Communications on Selective Channels",
            "Coded Digital Communications",
            "Local Networks and Telecommunications",
            "Internet and Graphs",
            "Concurrent and Communicating Systems"
          ]
        },
        {
          semester: "Semester 8",
          track: "Networks",
          note: "Each UE (Teaching Unit) is worth 5 ECTS credits",
          courses: [
            "Model-Driven Engineering and Web Development",
            "Network Science and Machine Learning",
            "Interconnections and Network Modeling",
            "Wireless and Mobile Telecommunications Systems",
            "Mobile Systems, Applications and Security"
          ]
        }
      ]
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "Semester 9",
          track: "Big Data and IoT Infrastructure",
          note: "Each UE (Teaching Unit) is worth 5 ECTS credits - Choose 1/2 UE",
          courses: [
            "Cloud and Big Data Infrastructure",
            "Operator Networks",
            "Infrastructure Services",
            "Networks for IoT"
          ]
        }
      ]
    }
  ];

  const yearTabs = ["1st Year", "2nd Year", "3rd Year"];

  return (
    <section className="c-space section-spacing">
      <h2 className="text-heading mb-8">Engineering Courses</h2>

      {/* Top Window Slider */}
      <div className="relative mb-8">
        <div className="flex gap-2 p-1 bg-storm/50 rounded-lg backdrop-blur-sm">
          {yearTabs.map((year, index) => (
            <button
              key={index}
              onClick={() => setActiveYear(index)}
              className={`relative z-10 flex-1 px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
                activeYear === index
                  ? "text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        {/* Animated background slider */}
        <motion.div
          className="absolute top-1 bottom-1 bg-gradient-to-r from-royal to-lavender rounded-md"
          initial={false}
          animate={{
            left: `calc(${(activeYear * 100) / yearTabs.length}% + ${activeYear * 0.5}rem)`,
            width: `calc((100% - ${(yearTabs.length - 1) * 0.5}rem) / ${yearTabs.length})`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      {/* Horizontal Sliding Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {coursesData[activeYear].semesters.map((semester, semIndex) => (
              <motion.div
                key={semIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: semIndex * 0.1 }}
                className="grid-default-color p-6 rounded-2xl"
              >
                <div className="mb-4">
                  <h3 className="headtext text-xl font-bold">
                    {coursesData[activeYear].year} - {semester.semester}
                  </h3>
                  {semester.track && (
                    <p className="text-sm text-aqua font-medium mt-1">
                      Track: {semester.track}
                    </p>
                  )}
                  <p className="subtext text-xs mt-2">{semester.note}</p>
                </div>
                <ul className="space-y-3">
                  {semester.courses.map((course, courseIndex) => (
                    <motion.li
                      key={courseIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (semIndex * 0.1) + (courseIndex * 0.05) }}
                      className="flex items-start gap-3 text-sm text-neutral-300"
                    >
                      <span className="text-aqua mt-1">▸</span>
                      <span>{course}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EngCourses;


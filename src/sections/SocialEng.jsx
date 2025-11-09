import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SocialEng = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Actions", "Projects"];

  const actionsData = [
    {
      title: "Elderly Shelter Volunteer Experience",
      location: "Morocco",
      date: "2024",
      description: "I spent an entire day volunteering at an elderly shelter in Morocco, where I had the profound opportunity to connect with the residents and contribute to their daily well-being.",
      highlights: [
        "Spent quality time engaging in meaningful conversations with elderly residents",
        "Assisted with daily activities and provided companionship",
        "Helped organize recreational activities and social gatherings",
        "Learned about the importance of intergenerational connections",
        "Gained deep appreciation for the wisdom and life experiences of the elderly community"
      ],
      impact: "This experience reinforced my commitment to giving back to the community and highlighted the importance of social responsibility in creating a more compassionate society."
    }
  ];

  const projectsData = [
    {
      title: "Community Engagement Initiatives",
      description: "Ongoing projects focused on sustainability and social impact in Morocco",
      items: [
        "Environmental awareness campaigns in local communities",
        "Digital literacy programs for underserved populations",
        "Sustainable technology solutions for rural areas",
        "Collaboration with local NGOs on civic engagement projects"
      ]
    }
  ];

  return (
    <section className="c-space section-spacing">
      <div className="mb-8">
        <h2 className="text-heading mb-2">Sustainability & Civic Engagement</h2>
        <p className="subtext text-base">
          Committed to making a positive impact through community service and sustainable initiatives
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="relative mb-8">
        <div className="flex gap-2 p-1 bg-storm/50 rounded-lg backdrop-blur-sm max-w-md">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative z-10 flex-1 px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
                activeTab === index
                  ? "text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Animated background slider */}
        <motion.div
          className="absolute top-1 bottom-1 bg-gradient-to-r from-royal to-lavender rounded-md max-w-md"
          initial={false}
          animate={{
            left: `calc(${(activeTab * 100) / tabs.length}% + ${activeTab * 0.5}rem)`,
            width: `calc((100% - ${(tabs.length - 1) * 0.5}rem) / ${tabs.length})`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="space-y-6"
            >
              {actionsData.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid-default-color p-8 rounded-2xl"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="headtext text-2xl font-bold mb-2">
                          {action.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                          <span className="flex items-center gap-2">
                            <span className="text-aqua">📍</span>
                            {action.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-aqua">📅</span>
                            {action.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="subtext text-base leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="headtext text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-aqua">✨</span>
                      Key Activities
                    </h4>
                    <ul className="space-y-3">
                      {action.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                          className="flex items-start gap-3 text-sm text-neutral-300"
                        >
                          <span className="text-aqua mt-1 flex-shrink-0">▸</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.1) + 0.3 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <p className="subtext text-sm leading-relaxed italic">
                      "{action.impact}"
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="space-y-6"
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid-default-color p-8 rounded-2xl"
                >
                  <h3 className="headtext text-2xl font-bold mb-4">
                    {project.title}
                  </h3>
                  <p className="subtext text-base leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <ul className="space-y-3">
                    {project.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                        className="flex items-start gap-3 text-sm text-neutral-300"
                      >
                        <span className="text-aqua mt-1 flex-shrink-0">▸</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Morocco Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 grid-default-color p-6 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">🇲🇦</div>
          <div>
            <h4 className="headtext text-lg font-semibold mb-1">
              Rooted in Morocco
            </h4>
            <p className="subtext text-sm">
              My commitment to sustainability and civic engagement is deeply connected to my roots in Morocco, 
              where I actively participate in community initiatives and social causes.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SocialEng;


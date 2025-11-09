import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { BoxingGloves } from "../components/BoxingGloves";
import { Skateboard } from "../components/Skateboard";
import Loader from "../components/Loader";

const Activities = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Actions", "Projects"];

  const actionsData = [
    {
      title: "Boxing",
      description: "I'm passionate about boxing, a sport that teaches discipline, focus, and resilience. Training in boxing has helped me develop mental toughness and physical strength, qualities that translate into my professional life.",
      highlights: [
        "Regular training sessions focusing on technique and conditioning",
        "Emphasis on discipline, strategy, and mental fortitude",
        "Building physical strength and cardiovascular endurance",
        "Learning the importance of respect and sportsmanship",
        "Stress relief and maintaining a healthy work-life balance"
      ],
      model: "boxing"
    },
    {
      title: "Skateboarding",
      description: "Skateboarding is more than just a hobby for me—it's a creative outlet and a way to stay active. The freedom and creativity of skateboarding inspire me to think outside the box in my technical work.",
      highlights: [
        "Exploring urban landscapes and skate parks",
        "Continuous learning of new tricks and techniques",
        "Building balance, coordination, and spatial awareness",
        "Connecting with a vibrant community of skaters",
        "Finding creative solutions to challenges on and off the board"
      ],
      model: "skateboard"
    }
  ];

  const projectsData = [
    {
      title: "Sports & Fitness Projects",
      description: "Combining my passion for sports with technology and community engagement",
      items: [
        "Fitness tracking applications for personal training",
        "Community sports event organization",
        "Sharing training tips and techniques with beginners",
        "Documenting skateboarding spots and routes",
        "Promoting active lifestyle and wellness"
      ]
    }
  ];

  const ModelViewer = ({ modelType }) => {
    return (
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
          physicallyCorrectLights: true
        }}
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        style={{ width: "100%", height: "400px", background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 5]} 
            fov={45}
            near={0.1}
            far={100}
          />
          
          {/* Realistic three-point lighting setup */}
          
          {/* Key Light - Main bright light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
            color="#ffffff"
          />
          
          {/* Fill Light - Soft fill from opposite side */}
          <directionalLight
            position={[-5, 3, -3]}
            intensity={1.2}
            color="#ffffff"
          />
          
          {/* Rim/Back Light - Separates object from background */}
          <directionalLight
            position={[0, 5, -8]}
            intensity={1.5}
            color="#ffffff"
          />
          
          {/* Ambient Light - Overall scene brightness */}
          <ambientLight intensity={1.0} color="#ffffff" />
          
          {/* Additional accent lights for realism */}
          <pointLight 
            position={[3, 4, 3]} 
            intensity={0.8}
            distance={10}
            decay={2}
            color="#ffffff"
          />
          
          <pointLight 
            position={[-3, 2, -3]} 
            intensity={0.6}
            distance={10}
            decay={2}
            color="#ffffff"
          />
          
          {/* Ground plane for realistic shadows */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -2, 0]}
            receiveShadow
          >
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          
          {modelType === "boxing" && (
            <BoxingGloves scale={1.8} position={[0, -0.5, 0]} />
          )}
          {modelType === "skateboard" && (
            <Skateboard scale={0.7} position={[0, 0, 0]} />
          )}
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
          />
          
          {/* Realistic environment with better lighting */}
          <Environment 
            preset="studio"
            background={false}
            environmentIntensity={1.5}
          />
        </Suspense>
      </Canvas>
    );
  };


  return (
    <section className="c-space section-spacing">
      <div className="mb-8">
        <h2 className="text-heading mb-2">Sports & Other Activities</h2>
        <p className="subtext text-base">
          Balancing technical work with active pursuits that fuel creativity and well-being
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
              className="space-y-8"
            >
              {actionsData.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="grid-default-color rounded-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* 3D Model Section */}
                    <div className="relative bg-gradient-to-br from-storm/50 to-indigo/50 p-8 flex items-center justify-center min-h-[400px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-aqua/10 to-royal/10" />
                      <Suspense fallback={
                        <div className="flex items-center justify-center h-full">
                          <Loader />
                        </div>
                      }>
                        <ModelViewer modelType={activity.model} />
                      </Suspense>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="headtext text-2xl font-bold mb-4">
                        {activity.title}
                      </h3>
                      <p className="subtext text-base leading-relaxed mb-6">
                        {activity.description}
                      </p>
                      
                      <div>
                        <h4 className="headtext text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="text-aqua">✨</span>
                          Why I Love It
                        </h4>
                        <ul className="space-y-3">
                          {activity.highlights.map((highlight, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.15) + (idx * 0.05) }}
                              className="flex items-start gap-3 text-sm text-neutral-300"
                            >
                              <span className="text-aqua mt-1 flex-shrink-0">▸</span>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
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
    </section>
  );
};

export default Activities;


import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { MoroccanIncenseBurner } from "../components/MoroccanIncenseBurner";
import Loader from "../components/Loader";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

const DetailsAboutMe = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const ModelViewer = () => {
    return (
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
          physicallyCorrectLights: true
        }}
        camera={{ 
          position: [0, 0.8, 3.4], 
          fov: 40,
          near: 0.1,
          far: 100
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0.8, 3.4]} 
            fov={40}
            near={0.1}
            far={100}
          />
          
          {/* Realistic lighting setup */}
          <ambientLight intensity={0.9} color="#ffffff" />
          
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.6}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
            color="#ffffff"
          />
          
          <directionalLight
            position={[-4, 3, -3]}
            intensity={0.9}
            color="#ffffff"
          />
          
          {/* Warm accent lights for Moroccan feel */}
          <pointLight 
            position={[1.8, 2.4, 1.8]} 
            intensity={0.9}
            distance={10}
            decay={2}
            color="#d6995c"
          />
          
          <pointLight 
            position={[-1.6, 1.6, -1.6]} 
            intensity={0.6}
            distance={10}
            decay={2}
            color="#d6995c"
          />
          
          {/* Ground plane for subtle shadow grounding */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -1.05, 0]}
            receiveShadow
          >
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.18} />
          </mesh>
          
          {/* Centered, slightly smaller burner so it fits the card */}
          <MoroccanIncenseBurner scale={0.95} position={[0, -0.15, 0]} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={1.8}
            maxDistance={5}
            autoRotate={true}
            autoRotateSpeed={0.3}
            enableDamping={true}
            dampingFactor={0.06}
          />
          
          <Environment 
            preset="sunset"
            background={false}
            environmentIntensity={0.9}
          />
        </Suspense>
      </Canvas>
    );
  };

  return (
    <section className="c-space section-spacing">
      <div className="mb-8">
        <h2 className="text-heading mb-2">Get to Know Me</h2>
        <p className="subtext text-base">
          A personal introduction to who I am, my background, and my journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Video */}
        <div className="space-y-6">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid-default-color rounded-2xl overflow-hidden relative group h-[220px] lg:h-[300px]"
          >
          <div className="relative overflow-hidden bg-gray-800 h-full flex items-center justify-center">
            <img
              src="/walid.jpeg"
              alt="Walid Assknid"
              className="max-w-full max-h-full object-contain object-center transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold text-lg">Walid Assknid</p>
              <p className="text-white/80 text-sm">Computer Science Student</p>
            </div>
          </div>

          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid-default-color rounded-2xl overflow-hidden relative group h-[360px] lg:h-[520px]"
          >
            <div className="relative bg-black w-full h-full">
              <video
                ref={videoRef}
                src="/video.mp4"
                className="w-full h-full object-cover"
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                poster="/walid.jpeg"
              />
              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-storm/80 to-indigo/80 backdrop-blur-sm cursor-pointer"
                  onClick={() => {
                    // Play the video when clicking the overlay
                    if (videoRef.current) {
                      const p = videoRef.current.play();
                      if (p && p.catch) p.catch(() => {});
                    }
                    handleVideoPlay();
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-lg">Watch My Story</p>
                    <p className="text-white/80 text-sm mt-1">Click to play</p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column - 3D Model and Description */}
        <div className="space-y-6">
          {/* 3D Moroccan Incense Burner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid-default-color rounded-2xl overflow-hidden relative h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-storm/50 to-indigo/30" />
            <div className="absolute inset-0 z-10">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader />
                </div>
              }>
                <ModelViewer />
              </Suspense>
            </div>
            
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-indigo/90 to-transparent z-20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🇲🇦</span>
                <h3 className="headtext text-xl font-bold text-white">
                  Moroccan Heritage
                </h3>
              </div>
              <p className="text-sm text-white/90">
                A symbol of my cultural roots and traditions
              </p>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid-default-color p-8 rounded-2xl"
          >
            <h3 className="headtext text-2xl font-bold mb-4">
              About My Background
            </h3>
            <div className="space-y-4">
              <p className="subtext text-base leading-relaxed">
                Born and raised in Morocco, I bring a unique cultural perspective to my work in technology. 
                My heritage has taught me the value of craftsmanship, attention to detail, and the importance 
                of community—values that I carry into every project I work on.
              </p>
              <p className="subtext text-base leading-relaxed">
                The Moroccan incense burner you see represents more than just an object—it symbolizes the 
                rich traditions, artistry, and warmth of my culture. Just as this piece combines form and 
                function, I strive to create technology solutions that are both beautiful and purposeful.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="subtext text-sm italic">
                  "Technology is my craft, but my roots keep me grounded."
                </p>
              </div>

              {/* CVs and Social Links */}
              <div className="mt-8 space-y-6">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/CV_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo/20 hover:bg-indigo/30 transition-colors duration-300"
                  >
                    <HiDocumentText className="text-xl" />
                    <span>CV (English)</span>
                  </a>
                  <a
                    href="/CV_FR.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo/20 hover:bg-indigo/30 transition-colors duration-300"
                  >
                    <HiDocumentText className="text-xl" />
                    <span>CV (Français)</span>
                  </a>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a
                    href="https://github.com/WalidAssknid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo/20 hover:bg-indigo/30 transition-colors duration-300"
                  >
                    <FaGithub className="text-xl" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/walid-assknid/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo/20 hover:bg-indigo/30 transition-colors duration-300"
                  >
                    <FaLinkedin className="text-xl" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailsAboutMe;


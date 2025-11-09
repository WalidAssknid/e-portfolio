"use client";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [unlockedItems, setUnlockedItems] = useState(new Set());

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const unlockItem = (index) => {
    setUnlockedItems((prev) => new Set([...prev, index]));
  };

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => {
          const isLocked = item.locked && !unlockedItems.has(index);
          
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
                <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                  {isLocked ? (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 p-2 border-2 rounded-full bg-gradient-to-br from-royal to-lavender border-aqua"
                    >
                      <div className="w-full h-full rounded-full bg-royal/50" />
                    </motion.div>
                  ) : (
                    <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
                  )}
                </div>
                <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                  <h3>{item.date}</h3>
                  <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                  <h3 className="text-3xl text-neutral-500">{item.job}</h3>
                </div>
              </div>

              <div className="relative w-full pl-20 pr-4 md:pl-4">
                <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                  <h3>{item.date}</h3>
                  <h3>{item.job}</h3>
                </div>
                
                {isLocked ? (
                  <LockedContent onUnlock={() => unlockItem(index)} />
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.contents.map((content, contentIndex) => (
                        <p className="mb-3 font-normal text-neutral-400" key={contentIndex}>
                          {content}
                        </p>
                      ))}
                      {item.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 p-4 rounded-lg bg-gradient-to-br from-royal/20 to-lavender/20 border border-aqua/30"
                        >
                          <p className="text-sm text-neutral-300 mb-2">
                            <span className="text-aqua font-semibold">📧 Contact:</span>
                          </p>
                          <a
                            href={`mailto:${item.email}`}
                            className="text-aqua hover:text-white transition-colors font-medium break-all"
                          >
                            {item.email}
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const LockedContent = ({ onUnlock }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: isHovered ? 1 : 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-lg border-2 border-royal/50 bg-gradient-to-br from-storm/50 to-indigo/30 backdrop-blur-sm"
    >
      {/* Lock overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal/40 to-lavender/40 opacity-60" />
      
      {/* Lock icon and text */}
      <div className="relative p-8 text-center">
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-6xl"
        >
          🔒
        </motion.div>
        
        <h3 className="text-2xl font-bold text-neutral-200 mb-2">
          Premium Content
        </h3>
        
        <p className="text-neutral-400 mb-4">
          This experience is locked
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
          disabled={isUnlocking}
          className="relative px-8 py-4 bg-gradient-to-r from-royal to-lavender rounded-lg font-bold text-white shadow-lg shadow-royal/50 overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isUnlocking ? (
              <motion.span
                key="unlocking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
                Unlocking...
              </motion.span>
            ) : (
              <motion.span
                key="unlock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                💎 Unlock Now (Free)
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: isHovered ? ["-100%", "200%"] : "-100%",
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{ width: "50%", height: "100%" }}
          />
        </motion.button>
        
        <p className="text-xs text-neutral-500 mt-4">
          * No payment required, just click to unlock!
        </p>
      </div>
      
      {/* Particle effects on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-aqua rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 0.8,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
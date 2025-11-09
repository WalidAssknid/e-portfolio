import { motion } from "motion/react";
import { GermanyGlobe } from "../components/GermanyGlobe";

const InterMobility = () => {
  return (
    <section className="c-space section-spacing">
      <h2 className="text-heading mb-8">International Mobility</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div>
            <h3 className="headtext text-2xl font-bold mb-4">
              Upcoming Mobility in Germany
            </h3>
            <p className="subtext text-base leading-relaxed">
              I'm planning to pursue an international mobility experience in Germany, 
              where I'll have the opportunity to immerse myself in a vibrant tech ecosystem 
              and gain valuable cross-cultural professional experience.
            </p>
          </div>

          <div className="grid-default-color p-6 rounded-2xl">
            <h4 className="headtext text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-aqua"></span>
              Cloud Computing Specialization
            </h4>
            <p className="subtext text-sm leading-relaxed">
              During my mobility, I plan to specialize in <strong className="text-white">Cloud Computing</strong>, 
              focusing on modern cloud infrastructure, distributed systems, and scalable architectures. 
              This specialization aligns with my passion for infrastructure and cloud technologies, 
              and will provide me with hands-on experience in cutting-edge cloud platforms and services.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-storm/50 rounded-lg backdrop-blur-sm border border-aqua/20"
            >
              <span className="text-sm text-aqua"> International Experience</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-storm/50 rounded-lg backdrop-blur-sm border border-aqua/20"
            >
              <span className="text-sm text-aqua"> Cloud Computing</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-storm/50 rounded-lg backdrop-blur-sm border border-aqua/20"
            >
              <span className="text-sm text-aqua"> Professional Growth</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Floating animation */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Glow effect behind globe */}
            <div className="absolute inset-0 bg-aqua/20 blur-3xl rounded-full scale-150" />
            
            {/* Globe with marker */}
            <div className="relative z-10">
              <GermanyGlobe />
            </div>
          </motion.div>

          {/* Location label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-sm font-medium text-aqua">Berlin, Germany</p>
            <p className="text-xs text-neutral-400 mt-1">52.52° N, 13.405° E</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterMobility;


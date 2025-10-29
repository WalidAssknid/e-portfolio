import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Canvas } from "@react-three/fiber";
import { Astronaut } from "../components/Astronaut";
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Astron } from "../components/Astron";

const Hero = () => {
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
        <HeroText />
        <ParallaxBackground />
        <figure className="absolute inset-0" style={{width:"100vw", height:"100vh"}}>
            <Canvas shadows camera={{ position: [0, 2, 7], fov: 45 }}>
                <Suspense fallback={<Loader />}>
                <Float>
                    {/* Global ambient light */}
                    <ambientLight intensity={0.3} />

                    {/* Moonlight-style cool fill light */}
                    <directionalLight
                        position={[-5, 10, -5]}
                        intensity={0.4}
                        color={'#a2bfff'}
                        castShadow
                    />

                    {/* Ground reflection shadows */}
                    <ContactShadows
                        position={[0, -1.2, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2}
                        far={4}
                    />

                    {/* Realistic HDRI lighting */}
                    <Environment preset="sunset" background={false} />

                    {/* The Lantern */}
                    <Astronaut position={[0, -1, 0]} />
                    

                    {/* Optional interactive control */}
                    <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} />
                </Float>
                </Suspense>
            </Canvas>

        </figure>
        
    </section>
  )
}




export default Hero
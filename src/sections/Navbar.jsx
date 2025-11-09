import { useState } from "react"
import { motion } from "motion/react"
import { Link, NavLink } from 'react-router-dom'
function Navigation() {
    const items = [
        { label: 'Home', to: '/' },
        { label: 'About', to: { pathname: '/', hash: '#about' } },
        { label: 'Work', to: '/work' },
        { label: 'Details', to: '/details' },
        { label: 'Contact', to: '/contact' }
    ];

    return (
        <ul className="flex items-center gap-2">
            {items.map((item, idx) => (
                <li key={item.label} className="flex items-center">
                    <NavLink
                        to={item.to}
                        className={({ isActive }) => `nav-link px-2 py-1 ${isActive ? 'active text-white' : 'text-neutral-300 hover:text-white'}`}
                        end={item.to === '/'}
                    >
                        {item.label}
                    </NavLink>
                    {idx < items.length - 1 && (
                        <span className="mx-2 text-neutral-500">|</span>
                    )}
                </li>
            ))}
        </ul>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed top-0 inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
        <div className="mx-auto c-space max-w-7xl">
            <div className="flex items-center justify-between py-2 sm:py-0">
                <Link to="/" 
                className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">
                    Walid
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} 
                className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden">
                    <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} 
                    className="w-6 h-6"
                    alt="toggle" />
                </button>
                <nav className="hidden sm:flex">
                    <Navigation />
                </nav>
            </div>
        </div>
        {isOpen && (
            <motion.div className="block overflow-hidden text-center sm:hidden"
                initial={{opacity:0, x:-10 }}
                animate={{opacity:1, x:0 }}
                style={{maxHeight:"100vh" }}
                transition={{ duration:1 }}
                >
                <nav className="pb-5">
                    <Navigation />
                </nav>
            </motion.div>
        )}
    </div>
  )
}

export default Navbar
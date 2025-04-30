import { motion } from 'framer-motion';
import TypingTest from '../components/TypingTest';
import { Link } from 'react-router-dom';
import { useTypingStore } from '../store/useTypingStore';


const HomePage = () => {

    const user = useTypingStore((state) => state.userName);

    return (<div className="bg-black text-white min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <motion.nav
            className="flex justify-between items-center px-6 py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <h1 className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500">
                TypeWise
            </h1>
            <div className="flex space-x-6">
                {['Stats'].map((text, idx) => (
                    <Link
                        to={`/${text.toLowerCase()}`}
                        key={idx}
                        className=" text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 
             hover:from-cyan-900 hover:via-fuchsia-900 hover:to-rose-900 transition duration-300"
                    >
                        {text}
                    </Link>
                ))}
                {user == import.meta.env.VITE_ADMIN_NAME ?
                    <Link
                        to={import.meta.env.VITE_ADMIN_ROUTE}
                        className=" text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 
             hover:from-cyan-900 hover:via-fuchsia-900 hover:to-rose-900 transition duration-300"
                    >
                        Admin
                    </Link> : ""}
            </div>
        </motion.nav>


        {/* Typing Area */}
        <motion.main
            className="flex-grow flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <div className="w-full"> {/* <-- changed from max-w-3xl w-full */}
                <TypingTest />
            </div>
        </motion.main>


        <motion.footer
            className="flex justify-between items-center px-6 py-4 text-xs text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
        >
            {/* Left */}
            <span>srivastav (web developer)</span>

            {/* Center */}
            <span>© 2025 TypeWise</span>

        </motion.footer>


    </div>);
}


export default HomePage;

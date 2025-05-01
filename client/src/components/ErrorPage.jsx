import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center space-y-8 px-4">
                {/* Animated Error Code */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 animate-gradient-x">
                        404
                    </h1>
                </motion.div>

                {/* Holographic Message */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-purple-300 to-pink-400">
                        There has been an error
                    </h2>
                </motion.div>

                {/* Animated Return Button */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
                >
                    <Link to="/home">
                        <motion.button
                            className="px-8 py-3.5 rounded-lg relative overflow-hidden group font-semibold text-lg border-2 border-transparent bg-gradient-to-r from-teal-600/20 to-purple-600/20 hover:from-teal-600/30 hover:to-purple-600/30 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-300 relative z-10">
                                Home
                            </span>

                            {/* Border Animation */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400/30 transition-all rounded-lg" />

                            {/* Moving Gradient Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(45,212,191,.1)_50%,transparent_75%)] bg-[length:400%_400%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-purple-400/50 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ErrorPage;
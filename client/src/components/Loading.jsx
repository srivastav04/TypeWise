import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = () => {
    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Neon Spinner */}
            <motion.div
                className="w-24 h-24 rounded-full border-4 border-t-cyan-400 border-r-purple-500 border-b-pink-400 border-l-teal-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />

            {/* Neon Loading Text */}
            <motion.h1
                className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400"
                style={{
                    textShadow: '0 0 8px #05f2db, 0 0 16px #743ad5, 0 0 24px #ec4899',
                }}
                animate={{
                    textShadow: [
                        '0 0 8px #05f2db, 0 0 16px #743ad5, 0 0 24px #ec4899',
                        '0 0 16px #05f2db, 0 0 32px #743ad5, 0 0 48px #ec4899',
                        '0 0 8px #05f2db, 0 0 16px #743ad5, 0 0 24px #ec4899',
                    ],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
                Loading...
            </motion.h1>
        </div>
    );
};

export default LoadingPage;
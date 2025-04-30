import { motion, useAnimation } from 'framer-motion';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Background grid component
const NeonGrid = () => {
    return (
        <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]">
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,255,255,0.02)_0%,transparent_50%)]"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>
        </div>
    );
};

// Animated keyboard keys
const KeyboardBackground = () => {
    const keys = Array.from({ length: 10 }, () => useAnimation());

    useEffect(() => {
        keys.forEach((ctrl, i) => {
            ctrl.start({
                scaleY: [1, 0.4, 1],
                transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
            });
        });
    }, []);

    const keyW = 80;
    const keyH = 24;
    const gap = 16;
    const totalW = keys.length * keyW + (keys.length - 1) * gap;

    return (
        <svg
            width={totalW}
            height={keyH}
            className="absolute inset-x-0 top-1/3 mx-auto opacity-10"
        >
            {keys.map((ctrl, i) => (
                <motion.rect
                    key={i}
                    x={i * (keyW + gap)}
                    y={0}
                    width={keyW}
                    height={keyH}
                    rx={6}
                    fill="#0ff"
                    className="filter drop-shadow-[0_0_4px_rgba(0,255,255,0.5)]"
                    animate={ctrl}
                    style={{ originX: i * (keyW + gap) + keyW / 2, originY: keyH / 2 }}
                />
            ))}
        </svg>
    );
};

// Falling letters animation with reduced opacity
const FallingLetters = () => {
    const letters = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2, // between 3-5 seconds
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {letters.map(({ id, char, left, delay, duration }) => (
                <motion.span
                    key={id}
                    className="absolute text-xl font-mono font-bold text-gray-100 opacity-10"
                    style={{ left: `${left}%`, top: '-10vh' }}
                    initial={{ top: '-10vh', opacity: 1 }}
                    animate={{ top: '110vh', opacity: 1 }}
                    transition={{ duration, delay, ease: 'linear', repeat: Infinity }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};

const LandingPage = () => {
    const cursor = useAnimation();

    useEffect(() => {
        cursor.start({ opacity: [0, 1, 0], transition: { duration: 0.8, repeat: Infinity } });
    }, []);

    return (
        <div className="fixed inset-0 bg-black text-white overflow-hidden">
            <NeonGrid />
            <KeyboardBackground />
            <FallingLetters />

            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center h-full px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-6xl sm:text-7xl font-extrabold font-mono flex items-center text-cyan-400 drop-shadow-[0_0_8px_rgba(8,145,178,0.8)]"
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    TypeWise
                    <motion.span
                        className="inline-block w-1 h-10 bg-cyan-400 ml-2 drop-shadow-[0_0_8px_rgba(8,145,178,0.8)]"
                        animate={cursor}
                    />
                </motion.h1>

                <motion.p
                    className="mt-4 text-lg sm:text-xl max-w-2xl leading-relaxed text-gray-200 drop-shadow-[0_0_4px_rgba(52,211,153,0.6)]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Master your typing speed with neon-lit interfaces, real-time feedback, and immersive animations.
                </motion.p>

                <motion.button
                    className={clsx(
                        'mt-8 px-10 py-4 rounded-full font-semibold uppercase tracking-wide',
                        'bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600',
                        'drop-shadow-[0_0_8px_rgba(8,145,178,0.7)]',
                        'hover:scale-105 transition-transform duration-300'
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6, type: 'spring', stiffness: 130 }}
                >
                    <Link to="/signup">Get Started</Link>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default LandingPage;
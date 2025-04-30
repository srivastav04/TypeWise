import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTypingStore } from '../store/useTypingStore';
import WPMMeter from '../components/WPM';
import { allStats } from '../apiFunctions';
import OtherCard from '../components/OtherCard';
import LoadingPage from '../components/Loading';

const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: 'beforeChildren' } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const StatsPage = () => {
    const currentUserName = useTypingStore(state => state.userName);

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['allStats'],
        queryFn: () => allStats(),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <LoadingPage />
    }
    if (isError) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error loading stats</div>;
    }

    // find current user and compute metrics
    const current = users.find(u => u.userName === currentUserName) || { scores: [], averageScore: 0 };
    const scores = Array.isArray(current.scores) ? current.scores : [];
    const totalTests = current.totalTests;
    const avgWPM = Math.round(current.averageScore || 0);
    const highestWPM = scores.length ? Math.max(...scores) : 0;
    const lowestWPM = scores.length ? Math.min(...scores) : 0;
    const lastTests = scores.slice(-10);

    // other users
    const others = users.filter(u => u.userName !== currentUserName);

    return (
        <motion.div
            className="relative min-h-screen bg-black text-white overflow-visible"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-full bg-gradient-to-b from-teal-400 via-purple-400 to-transparent"
                        style={{ left: `${(i + 1) * (100 / 21)}%` }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-[1px] bg-gradient-to-r from-pink-500 via-teal-400 to-transparent"
                        style={{ top: `${(i + 1) * (100 / 13)}%` }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 1 }}
                    />
                ))}
                <motion.div
                    className="absolute w-full h-[1px] bg-gradient-to-r from-teal-400/40 to-pink-500/40"
                    animate={{ y: ['-30%', '130%'], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute h-full w-[1px] bg-gradient-to-b from-purple-400/40 to-teal-400/40"
                    animate={{ x: ['-30%', '130%'], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
                />
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full blur-lg"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: 'radial-gradient(circle,rgba(45,212,191,0.4)0%,rgba(45,212,191,0)70%)' }}
                        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
                {/* Profile */}
                <motion.header className="mb-12" variants={itemVariants}>
                    <div className="flex items-center gap-6 p-4 backdrop-blur-lg bg-white/5 rounded-xl">
                        <img
                            src={current.avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full border-4 border-teal-400"
                        />
                        <div>
                            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500">
                                {currentUserName}
                            </h1>
                            <p className="mt-2 text-gray-400">Joined: {current.createdAt.slice(0, 10)}</p>
                            <p className="text-gray-400">Tests Taken: {totalTests}</p>
                        </div>
                    </div>
                </motion.header>

                {/* Stats Grid */}
                <motion.section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" variants={itemVariants}>
                    {[
                        { label: 'Average WPM', value: avgWPM, color: 'from-purple-400 to-pink-500' },
                        { label: 'Peak WPM', value: highestWPM, color: 'from-teal-400 to-purple-500' },
                        { label: 'Lowest WPM', value: lowestWPM, color: 'from-pink-400 to-purple-500' },
                    ].map((m, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }} className="p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10">
                            <div className={`text-4xl font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.value}<span className="text-xl text-gray-400"> WPM</span></div>
                            <p className="mt-2 text-gray-400">{m.label}</p>
                            <div className="mt-4"><WPMMeter wpm={m.value} /></div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Recent Tests */}
                <motion.section className="mb-16" variants={itemVariants}>
                    <h2 className="text-2xl font-bold mb-4">Recent Tests</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {lastTests.map((s, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
                                <div className="text-2xl font-bold text-purple-400">{s}</div>
                                <div className="text-sm text-gray-400">WPM</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Other Users */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-2xl font-bold mb-4">Typing Warriors</h2>
                    {
                        others.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {others.map((u, i) => (
                                    <OtherCard key={i} u={u} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No other users found.</p>
                        )
                    }

                </motion.section>
            </div>
        </motion.div>
    );
};

export default StatsPage;

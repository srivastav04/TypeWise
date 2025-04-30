import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WPMMeter from '../components/WPM';

// Dummy data for demo
const dummyUsers = [
    { userName: 'srivatsav', joined: '2025-01-15', stats: { totalTests: 28, avgWPM: 65, highestWPM: 95, lowestWPM: 40, lastTests: [60, 70, 55, 80, 45, 90, 50, 75, 68, 82] } },
    { userName: 'alice', joined: '2025-02-02', stats: { totalTests: 15, avgWPM: 58, highestWPM: 85, lowestWPM: 30, lastTests: [55, 60, 50, 70, 65, 40, 80, 45, 72, 68] } },
    { userName: 'bob', joined: '2025-03-10', stats: { totalTests: 22, avgWPM: 72, highestWPM: 100, lowestWPM: 50, lastTests: [80, 85, 75, 90, 60, 95, 70, 88, 77, 92] } },
];

const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

const StatsPage = () => {
    const { userName } = useParams();
    const user = dummyUsers.find(u => u.userName === userName) || dummyUsers[0];
    const { joined, stats } = user;
    const { totalTests, avgWPM, highestWPM, lowestWPM, lastTests } = stats;

    return (
        <motion.div
            className="min-h-screen bg-black text-white px-6 py-10"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.header variants={itemVariants} className="max-w-4xl mx-auto mb-12">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500">
                    {userName}'s Stats
                </h1>
                <p className="mt-2 text-gray-400">Joined: {joined} &middot; Tests Taken: {totalTests}</p>
            </motion.header>

            {/* Metrics */}
            <motion.section
                variants={itemVariants}
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
                {[
                    { label: 'Average WPM', value: avgWPM },
                    { label: 'Highest WPM', value: highestWPM },
                    { label: 'Lowest WPM', value: lowestWPM },
                ].map((m, i) => (
                    <motion.div
                        key={m.label}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/5 backdrop-blur-lg border border-teal-400/20 rounded-2xl p-6 flex flex-col items-center shadow-lg shadow-teal-500/30"
                    >
                        <WPMMeter wpm={m.value} />
                        <span className="mt-4 text-xl font-semibold uppercase text-gray-300">{m.label}</span>
                    </motion.div>
                ))}
            </motion.section>

            {/* Last 10 Tests */}
            <motion.section
                variants={itemVariants}
                className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-lg shadow-purple-500/30"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-100">Last 10 Test Scores</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    {lastTests.map((score, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-teal-400 flex items-center justify-center rounded-lg text-2xl font-bold text-black shadow-md shadow-purple-500/40"
                        >
                            {score}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Other Users */}
            <motion.section
                variants={itemVariants}
                className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6 shadow-lg shadow-pink-500/30"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Other Users</h2>
                <div className="flex flex-wrap gap-4">
                    {dummyUsers.filter(u => u.userName !== userName).map(u => (
                        <Link
                            key={u.userName}
                            to={`/stats/${u.userName}`}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-lg text-white font-medium hover:opacity-90 transition"
                        >
                            {u.userName}
                        </Link>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
};

export default StatsPage;

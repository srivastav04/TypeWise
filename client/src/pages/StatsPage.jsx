import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTypingStore } from '../store/useTypingStore';
import WPMMeter from '../components/WPM';
import { allStats } from '../apiFunctions';
import OtherCard from '../components/OtherCard';
import LoadingPage from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

const StatsPage = () => {
    const currentUserName = useTypingStore(state => state.userName);

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['allStats'],
        queryFn: () => allStats(),
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <LoadingPage />;
    if (isError) return <ErrorPage />;

    const current = users.find(u => u.userName === currentUserName) || { scores: [], averageScore: 0 };
    const scores = Array.isArray(current.scores) ? current.scores : [];
    const totalTests = current.totalTests;
    const avgWPM = Math.round(current.averageScore || 0);
    const highestWPM = scores.length ? Math.max(...scores) : 0;
    const lowestWPM = scores.length ? Math.min(...scores) : 0;
    const lastTests = scores.slice(-10);
    const others = users.filter(u => u.userName !== currentUserName);

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="px-6 py-12 max-w-6xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl backdrop-blur-lg">
                        <img
                            src={current.avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full border-4 border-teal-400"
                        />
                        <div>
                            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500">
                                {currentUserName}
                            </h1>
                            <p className="mt-2 text-gray-400">Joined: {current.createdAt.slice(0, 10)}</p>
                            <p className="text-gray-400">Tests Taken: {totalTests}</p>
                        </div>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { label: 'Average WPM', value: avgWPM, color: 'from-purple-400 to-pink-500' },
                        { label: 'Peak WPM', value: highestWPM, color: 'from-teal-400 to-purple-500' },
                        { label: 'Lowest WPM', value: lowestWPM, color: 'from-pink-400 to-purple-500' },
                    ].map((m, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg"
                        >
                            <div
                                className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${m.color}`}
                            >
                                {m.value}
                                <span className="text-xl text-gray-400"> WPM</span>
                            </div>
                            <p className="mt-2 text-gray-400">{m.label}</p>
                            <div className="mt-4">
                                <WPMMeter wpm={m.value} />
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-4">Recent Tests</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {lastTests.map((s, i) => (
                            <div
                                key={i}
                                className="p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10"
                            >
                                <div className="text-2xl font-bold text-purple-400">{s}</div>
                                <div className="text-sm text-gray-400">WPM</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Typing Warriors</h2>
                    {others.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {others.map((u, i) => (
                                <OtherCard key={i} u={u} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No other users found.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default StatsPage;

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userSignUp } from '../apiFunctions';
import { useTypingStore } from '../store/useTypingStore';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const setUser = useTypingStore((state) => state.setUser);

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const res = await userSignUp(userName, password);
            return res;
        },
        onSuccess: (data) => {
            setUser(userName);
            navigate('/home');
        },
        onError: (error) => {
            const msg = error.response?.data?.message || 'Signup failed';
            setErrorMsg(msg);
        }
    }
    );

    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(null);
        mutate();
    };

    const horizontalLines = [20, 50, 80];
    const verticalLines = [25, 70];

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-black px-4 overflow-hidden">
            {/* Neon-lit rays around form */}
            {horizontalLines.map((percent, idx) => (
                <motion.div
                    key={`h-${idx}`}
                    className="absolute left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-transparent opacity-60"
                    style={{ top: `calc(${percent}% - 1px)` }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 6 + idx * 2, ease: 'linear' }}
                />
            ))}
            {verticalLines.map((percent, idx) => (
                <motion.div
                    key={`v-${idx}`}
                    className="absolute top-0 h-full w-px bg-gradient-to-b from-purple-400 to-transparent opacity-60"
                    style={{ left: `calc(${percent}% - 1px)` }}
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 7 + idx * 2, ease: 'linear' }}
                />
            ))}

            {/* Glass form container */}
            <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-cyan-500/30 overflow-hidden">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 text-center mb-6">
                    Sign Up to TypeWise
                </h2>

                <form onSubmit={onSubmit} className="flex flex-col space-y-4 relative z-20">
                    <input
                        id="userName"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    />

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-md bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 text-white font-medium shadow-md shadow-purple-500/50 hover:shadow-pink-500/50 transition disabled:opacity-50"
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-300 relative z-20">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* Error Popup */}
            {errorMsg && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/60 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="bg-red-800/80 text-white p-6 rounded-lg">
                        <p className="mb-4">{errorMsg}</p>
                        <button
                            onClick={() => setErrorMsg(null)}
                            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SignUpPage;



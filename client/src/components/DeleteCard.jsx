import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../apiFunctions';

const DeleteCard = ({ u }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => deleteUser(u.userName),
        onSuccess: () => queryClient.invalidateQueries(['allusers']),
        onError: (error) => console.error('Delete error:', error),
    });

    return (
        <motion.div
            className="relative backdrop-blur-lg bg-black/30 border border-teal-500/40 rounded-2xl p-4 flex items-center justify-between hover:shadow-lg hover:shadow-teal-500/30 transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 opacity-30 blur-xl animate-pulse" />
                    <img
                        src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${u.userName}`}
                        alt={u.userName}
                        className="w-12 h-12 rounded-full border-2 border-white/20 relative z-10"
                    />
                </div>
                <div>
                    <div className="text-lg font-semibold text-white">{u.userName}</div>
                    <div className="text-sm text-gray-400">
                        {u.scores?.length || 0} tests • {Math.round(u.averageScore || 0)} WPM
                    </div>
                </div>
            </div>

            <button
                onClick={() => mutate()}
                disabled={isLoading}
                className="ml-4 p-2 bg-red-600/30 hover:bg-red-600/50 rounded-full transition-colors duration-200"
                aria-label="Delete user"
            >
                <span className="text-red-400 font-bold">DEL</span>
            </button>
        </motion.div>
    );
};

export default DeleteCard;
import WPMMeter from '../components/WPM';
import { useMutation } from '@tanstack/react-query';
import { addStat } from '../apiFunctions';
import { useTypingStore } from '../store/useTypingStore';

export default function Result({ onRestart }) {
    const userName = useTypingStore((s) => s.userName);
    const wpm = useTypingStore((s) => s.wpm);
    const { mutate, isLoading } = useMutation({
        mutationFn: () => {
            return addStat(userName, wpm);
        }
    },
    );

    const handleRestart = () => {
        mutate();
        onRestart();
    };

    if (isLoading) {
        return <div className="text-white">Saving score...</div>;
    }

    return (
        <div className="flex flex-col items-center space-y-6">
            <WPMMeter wpm={wpm} />
            <button
                onClick={handleRestart}
                className="px-5 py-2 bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 text-black font-semibold rounded-xl"
            >
                Restart Test
            </button>
        </div>
    );
}
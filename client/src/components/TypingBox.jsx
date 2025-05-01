import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useTypingStore } from '../store/useTypingStore';

export default function TypingBox() {
    const text = useTypingStore((s) => s.text);
    const typed = useTypingStore((s) => s.typed);

    return (
        <div className="w-full px-4 text-2xl sm:text-3xl font-mono tracking-wide flex flex-wrap mt-10">
            {text.split('').map((char, idx) => {
                const isTyped = idx < typed.length;
                const isCurrent = idx === typed.length;
                const isError = isTyped && char !== typed[idx];
                const isSpace = char === ' ';

                return (
                    <span key={idx} className="relative">
                        {isCurrent && (
                            <motion.span
                                className="absolute left-0 top-0 w-[2px] h-8 bg-white animate-blink"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        )}

                        <span className={clsx('whitespace-pre inline-block transition-colors duration-200',
                            !isTyped ? 'text-gray-500' : !isError ? 'text-white font-bold'
                                : isSpace ? 'bg-red-500' : 'text-red-500')}>
                            {char}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}

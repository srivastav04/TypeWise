import { useTypingStore } from '../store/useTypingStore';

export default function TypingBox() {
    const { text, typed } = useTypingStore();

    return (
        <div className="px-4 text-2xl sm:text-3xl font-mono tracking-wide flex flex-wrap mt-6 max-w-3xl whitespace-pre">
            {text.split('').map((char, i) => {
                const t = typed[i];
                const isCursor = i === typed.length;

                // Determine base color class for letters
                let letterClass = 'text-gray-500';
                if (t != null) {
                    letterClass = t === char ? 'text-white font-semibold' : 'text-red-500';
                }

                // For spaces, apply a subtle background highlight on correct/incorrect
                const spaceClass =
                    char === ' '
                        ? t == null
                            ? ' ' // no highlight before typing
                            : t === char
                                ? ''
                                : 'bg-red-500'
                        : '';

                return (
                    <span key={i} className="relative">
                        {isCursor && (
                            <span className="absolute left-0 top-0 w-[1px] h-full bg-white animate-blink" />
                        )}
                        <span
                            className={
                                char === ' '
                                    ? `${spaceClass} inline-block w-[0.5ch] h-6` // preserve space width
                                    : letterClass
                            }
                        >
                            {char}
                        </span>
                    </span>
                );
            })}

            {/* Cursor at end if done */}
            {typed.length >= text.length && (
                <span className="relative">
                    <span className="absolute left-0 top-0 w-[1px] h-full bg-white animate-blink" />
                </span>
            )}
        </div>
    );
}

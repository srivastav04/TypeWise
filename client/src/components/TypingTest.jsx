import { useEffect, useRef } from 'react';
import TypingBox from './TypingBox';
import Result from './Result';
import { useTypingStore } from '../store/useTypingStore';
import { sampleTexts } from '../utils/sampleText';

export default function TypingTest() {
    const {
        started,
        finished,
        startTest,
        resetTest,
        setText,
        text,
        typed,
        handleKeyPress,
    } = useTypingStore();

    const textareaRef = useRef(null);

    // Load a new random sample sentence
    const loadNewText = () => {
        const sample = sampleTexts[
            Math.floor(Math.random() * sampleTexts.length)
        ];
        setText(sample);
    };

    // On mount, load text
    useEffect(() => {
        loadNewText();
    }, []);

    // Global key listener for desktop typing
    useEffect(() => {
        const onKey = (e) => {
            if (!started || finished) return;
            if (document.activeElement === textareaRef.current) return;
            const key = e.key;
            if (key === 'Backspace' || key.length === 1) {
                e.preventDefault();
                handleKeyPress(key);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [started, finished, handleKeyPress]);

    // Manual focus to show keyboard on mobile
    const handleScreenTap = () => {
        if (started && !finished) {
            textareaRef.current?.focus({ preventScroll: true });
        }
    };

    const restartTest = () => {
        resetTest();
        loadNewText();
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-auto"
            onClick={handleScreenTap}
            style={{ touchAction: 'manipulation' }}
        >
            {!started && !finished && (
                <>
                    <p className="mb-2 text-gray-400">Make no mistakes to finish</p>
                    <button
                        onClick={() => {
                            loadNewText();
                            startTest();
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 font-semibold rounded-xl"
                    >
                        Start Typing Test
                    </button>
                </>
            )}

            {started && !finished && (
                <>
                    <TypingBox />


                    <textarea
                        ref={textareaRef}
                        className="fixed -bottom-[100px] left-0 w-full h-12 opacity-0 pointer-events-auto outline-none resize-none"
                        value={typed}
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace') {
                                e.preventDefault();
                                handleKeyPress('Backspace');
                            }
                        }}
                        onChange={(e) => {
                            const val = e.target.value;
                            const delta = val.slice(typed.length);
                            for (let ch of delta) handleKeyPress(ch);
                        }}
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        enterKeyHint="done"
                        data-hidden="true"
                    />
                </>
            )}

            {finished && <Result onRestart={restartTest} />}
        </div>
    );
}
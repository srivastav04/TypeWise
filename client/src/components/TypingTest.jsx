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
        handleKeyPress,
    } = useTypingStore();

    // Reference to hidden input to capture mobile keyboard events
    const inputRef = useRef(null);

    // Load a new random text
    const loadNewText = () => {
        const sample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setText(sample);
    };

    useEffect(() => {
        loadNewText();
    }, []);

    // Focus the hidden input whenever test starts
    useEffect(() => {
        if (started && !finished) {
            inputRef.current?.focus();
        }
    }, [started, finished]);

    const restartTest = () => {
        resetTest();
        loadNewText();
        // user must click Start again
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative">
            {/* Hidden input to trigger mobile keyboard and capture keystrokes */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 w-0 h-0"
                onKeyDown={(e) => {
                    e.preventDefault();
                    if (started && !finished) {
                        handleKeyPress(e.key);
                    }
                }}
                autoComplete="off"
            />

            {!started && !finished && (
                <>
                    <div className='flex justify-center items-center'>
                        <p className="mb-1  text-gray-400">There should be no errors to submit the test</p>
                    </div>

                    <button
                        onClick={() => {
                            loadNewText();
                            startTest();
                            // Focus input within user event to trigger keyboard on mobile
                            setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                        className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500 font-semibold rounded-xl"
                    >
                        Start Typing Test
                    </button>
                </>
            )}

            {started && !finished && <TypingBox />}
            {finished && <Result onRestart={restartTest} />}
        </div>
    );
}

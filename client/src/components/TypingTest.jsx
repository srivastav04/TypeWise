import { useEffect } from 'react';
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

    // Load a new random text
    const loadNewText = () => {
        const sample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setText(sample);
    };

    useEffect(() => {
        loadNewText();
    }, []);

    useEffect(() => {
        const onKey = (e) => {

            if (started && !finished) handleKeyPress(e.key);
        };
        if (started && !finished) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [started, finished, handleKeyPress]);

    const restartTest = () => {
        resetTest();
        loadNewText();
        // user must click Start again
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">

            {!started && !finished && (
                <>
                    <div className='flex justify-center items-center'>
                        <p className="mb-1  text-gray-400">There should be no errors to submit the test</p>
                    </div>

                    <button
                        onClick={() => {
                            loadNewText();
                            startTest();
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


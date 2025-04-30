import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const WPMMeter = ({ wpm }) => {
    const controls = useAnimation();
    const maxWPM = 120;

    const radius = 100;
    const stroke = 14;
    const normR = radius - stroke / 2;
    const semiCirc = Math.PI * normR;
    const pct = Math.min(wpm, maxWPM) / maxWPM;
    const dashOffset = semiCirc * (1 - pct);

    useEffect(() => {
        controls.start({ strokeDashoffset: dashOffset });
    }, [dashOffset, controls]);

    return (
        <motion.div
            className="mt-6 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            <svg
                width={radius * 2}
                height={radius + stroke}
                viewBox={`0 0 ${radius * 2} ${radius}`}
                className="overflow-visible"
            >
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#05f2db" />
                        <stop offset="100%" stopColor="#743ad5" />
                    </linearGradient>
                </defs>

                {/* Background arc */}
                <path
                    d={`M ${radius - normR},${radius} A ${normR},${normR} 0 0 1 ${radius + normR},${radius}`}
                    stroke="#374151"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                />

                {/* Progress arc */}
                <motion.path
                    d={`M ${radius - normR},${radius} A ${normR},${normR} 0 0 1 ${radius + normR},${radius}`}
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={semiCirc}
                    strokeDashoffset={semiCirc}
                    initial={{ strokeDashoffset: semiCirc }}
                    animate={controls}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                />

                {/* WPM value */}
                <text
                    x={radius}
                    y={radius - normR / 3}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="url(#progressGradient)"
                    fontSize="34"
                    fontWeight="bold"
                >
                    {wpm}
                </text>

                {/* Label */}
                <text
                    x={radius}
                    y={radius - normR / 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FFFFFF"
                    fontSize="16"
                >
                    WPM
                </text>
            </svg>
        </motion.div>
    );
};

export default WPMMeter;

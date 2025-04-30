import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const OtherCard = ({ i, u }) => {
    return (
        <div className="space-y-4 w-full">
            <motion.div key={i} whileHover={{ x: 5 }} className="relative group">
                <Link to={`/stats/${u.userName}`} state={u} className="flex items-center justify-between p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <img
                            src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${u.userName}`}
                            alt={u.userName} className="w-10 h-10 rounded-full border-2 border-teal-400"
                        />
                        <span className="font-medium text-white">{u.userName}</span>
                    </div>
                    <div className="text-gray-400">
                        {Array.isArray(u.scores) ? u.scores.length : 0} tests • {Math.round(u.averageScore || 0)} WPM
                    </div>
                </Link>
            </motion.div>
        </div>
    )
}

export default OtherCard;
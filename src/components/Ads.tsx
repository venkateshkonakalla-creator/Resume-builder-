import React from 'react';
import { Play, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RewardedAdProps {
  onComplete: () => void;
  onClose: () => void;
}

export const RewardedAd: React.FC<RewardedAdProps> = ({ onComplete, onClose }) => {
  const [timeLeft, setTimeLeft] = React.useState(5);
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [timeLeft]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Play className="h-8 w-8 fill-blue-600" />
          </div>
          
          <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Watching Ad...</h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">Your resume is being generated in high resolution. Please wait a moment.</p>

          <div className="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-blue-600"
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            {isFinished ? (
              <button 
                onClick={onComplete}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
              >
                <ShieldCheck className="h-5 w-5" />
                Download Now
              </button>
            ) : (
              <div className="w-full text-slate-400 font-bold text-sm bg-slate-50 py-3 rounded-xl border border-slate-100">
                Reward in {timeLeft}s
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export const BannerAd: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute top-1 right-2 text-[8px] font-bold text-slate-300 uppercase tracking-widest">Sponsored</div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center">
           <Play className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-600">QuickResume Premium</div>
          <div className="text-[10px] text-slate-400 font-medium">Unlock exclusive templates and AI features.</div>
        </div>
      </div>
      <button className="mt-3 w-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] py-1.5 rounded hover:bg-slate-50 transition-all">Learn More</button>
    </div>
  );
};

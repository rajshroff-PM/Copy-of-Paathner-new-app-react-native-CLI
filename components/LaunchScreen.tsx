import React from 'react';
import { X, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface LaunchScreenProps {
  onClose: () => void;
  onGoToFoodCourt: () => void;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({ onClose, onGoToFoodCourt }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-yellow-600/20 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      {/* Content Card */}
      <div className="relative w-full max-w-lg mx-4 bg-gray-900/80 border border-yellow-500/30 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden animate-fade-in p-8 text-center">
         
         {/* Confetti / Sparkles */}
         <div className="absolute top-10 left-10 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }}><Sparkles size={24} /></div>
         <div className="absolute top-20 right-12 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }}><Sparkles size={16} /></div>
         <div className="absolute bottom-20 left-12 text-yellow-400 animate-bounce" style={{ animationDelay: '0.8s' }}><Sparkles size={20} /></div>

         <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
         >
            <X size={24} />
         </button>

         <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black px-4 py-1 rounded-full text-sm uppercase tracking-widest mb-6 shadow-lg transform -rotate-2">
            Grand Launch Event
         </div>

         <h1 className="text-5xl md:text-6xl font-black text-white mb-2 leading-tight drop-shadow-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">₹1</span> <span className="text-yellow-500">SAMOSA</span>
         </h1>
         
         <p className="text-xl text-gray-300 font-light mb-8">
            The taste of celebration starts here.
         </p>

         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
             <p className="text-gray-300 leading-relaxed">
                <span className="text-yellow-400 font-bold block mb-1">EXCLUSIVE UNLOCK</span>
                Walk near the <b className="text-white">Food Court</b> to unlock this special offer instantly!
             </p>
         </div>

         <button 
            onClick={onGoToFoodCourt}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 group"
         >
            Go to Food Court <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
         </button>

         <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
             <MapPin size={14} /> Located on Food Court Floor
         </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
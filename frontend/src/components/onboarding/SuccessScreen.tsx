import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  onComplete: () => void;
}

export function SuccessScreen({ onComplete }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full`}
                style={{
                  backgroundColor: ['#A78BFA', '#F472B6', '#60A5FA', '#34D399', '#FBBF24'][Math.floor(Math.random() * 5)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300/50 to-pink-300/50 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-gray-900">You're all set!</h1>
          <p className="text-gray-600 text-xl">Let's rise together.</p>
          <p className="text-gray-500 max-w-sm mx-auto">
            Your journey starts now. Share your wins, track progress, and connect with allies.
          </p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-4 shadow-md">
            <div className="text-purple-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">Wins</div>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-4 shadow-md">
            <div className="text-pink-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">Allies</div>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-4 shadow-md">
            <div className="text-blue-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">Pods</div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onComplete}
          className="group w-full max-w-xs mx-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
}

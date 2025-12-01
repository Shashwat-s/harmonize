import { Rocket, Dumbbell, Briefcase, BookOpen, Palette, Sparkles } from 'lucide-react';

interface ChooseFocusScreenProps {
  onNext: (focus: string) => void;
  onBack: () => void;
}

export function ChooseFocusScreen({ onNext, onBack }: ChooseFocusScreenProps) {
  const focusOptions = [
    { id: 'startup', label: 'Startup', icon: Rocket, gradient: 'from-purple-400 to-indigo-400' },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, gradient: 'from-green-400 to-emerald-400' },
    { id: 'career', label: 'Career', icon: Briefcase, gradient: 'from-blue-400 to-cyan-400' },
    { id: 'learning', label: 'Learning', icon: BookOpen, gradient: 'from-orange-400 to-amber-400' },
    { id: 'creative', label: 'Creative', icon: Palette, gradient: 'from-pink-400 to-rose-400' },
    { id: 'other', label: 'Other', icon: Sparkles, gradient: 'from-purple-400 to-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-gray-900">What are you working on right now?</h2>
          <p className="text-gray-600">Choose your primary focus</p>
        </div>

        {/* Focus Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {focusOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onNext(option.label)}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-gray-900">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
          
          {/* Progress dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Target, ChevronDown } from 'lucide-react';

interface ChooseGoalScreenProps {
  focus: string;
  onNext: (goal: string) => void;
  onBack: () => void;
}

export function ChooseGoalScreen({ focus, onNext, onBack }: ChooseGoalScreenProps) {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const goalsByFocus: Record<string, string[]> = {
    'Startup': ['Launch MVP', 'Get first 100 users', 'Raise funding', 'Build team'],
    'Fitness': ['Lose weight', 'Build muscle', 'Run a marathon', 'Improve flexibility'],
    'Career': ['Get a new job', 'Get promoted', 'Switch careers', 'Start freelancing'],
    'Learning': ['Learn AI/ML', 'Master a language', 'Get certified', 'Learn to code'],
    'Creative': ['Launch portfolio', 'Publish content', 'Learn design', 'Build audience'],
    'Other': ['Custom goal'],
  };

  const goals = goalsByFocus[focus] || goalsByFocus['Other'];

  const handleContinue = () => {
    const goal = showCustom ? customGoal : selectedGoal;
    if (goal.trim()) {
      onNext(goal);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-gray-900">Choose your goal</h2>
          <p className="text-gray-600">What do you want to achieve?</p>
        </div>

        {/* Goal Options */}
        <div className="space-y-3">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => {
                if (goal === 'Custom goal') {
                  setShowCustom(true);
                } else {
                  setSelectedGoal(goal);
                  setShowCustom(false);
                }
              }}
              className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                (selectedGoal === goal || (goal === 'Custom goal' && showCustom))
                  ? 'border-purple-400 bg-purple-50/50 shadow-md'
                  : 'border-white/70 bg-white/60 hover:border-purple-200'
              }`}
            >
              <span className="text-gray-900">{goal}</span>
            </button>
          ))}

          {/* Custom Goal Input */}
          {showCustom && (
            <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-4 shadow-md">
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Enter your goal..."
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedGoal && !customGoal.trim()}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Continue
        </button>

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
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

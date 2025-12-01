import { useState } from 'react';
import { Users, ArrowLeftRight, Lightbulb, GraduationCap, Heart } from 'lucide-react';

interface WhatYouWantScreenProps {
  onNext: (wants: string[]) => void;
  onBack: () => void;
}

export function WhatYouWantScreen({ onNext, onBack }: WhatYouWantScreenProps) {
  const [selectedWants, setSelectedWants] = useState<string[]>([]);

  const options = [
    { id: 'accountability', label: 'Accountability partner', icon: Users },
    { id: 'skill-swap', label: 'Skill swap', icon: ArrowLeftRight },
    { id: 'co-founder', label: 'Co-founder', icon: Lightbulb },
    { id: 'mentor', label: 'Mentor', icon: GraduationCap },
    { id: 'community', label: 'Just community', icon: Heart },
  ];

  const toggleWant = (id: string) => {
    setSelectedWants(prev => 
      prev.includes(id) 
        ? prev.filter(w => w !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedWants.length > 0) {
      onNext(selectedWants);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-gray-900">What do you want?</h2>
          <p className="text-gray-600">Select all that apply</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedWants.includes(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => toggleWant(option.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-400 bg-gradient-to-r from-purple-50/80 to-pink-50/80 shadow-md'
                    : 'border-white/70 bg-white/60 hover:border-purple-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 shadow-md'
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} strokeWidth={1.5} />
                </div>
                <span className="text-gray-900 flex-1 text-left">{option.label}</span>
                
                {/* Checkmark */}
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedWants.length === 0}
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
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

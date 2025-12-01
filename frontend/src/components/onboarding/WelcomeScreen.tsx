import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Illustration */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1551740994-7af69385a217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjbGltYmluZyUyMG1vdW50YWluJTIwc3VucmlzZXxlbnwxfHx8fDE3NjQ0OTAxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Rising"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-4">
          <h1 className="text-gray-900">Welcome to AROH</h1>
          <p className="text-gray-600 text-xl">Rise with your goals.</p>
          <p className="text-gray-500 max-w-sm mx-auto">
            Track progress, share wins, and connect with allies on the same journey.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="group w-full max-w-xs mx-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span>Start Your Journey</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

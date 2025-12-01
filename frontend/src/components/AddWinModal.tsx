import { useState } from 'react';
import { X, Upload, Rocket, Dumbbell, BookOpen, Briefcase } from 'lucide-react';

interface AddWinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (win: { title: string; description: string; category: string }) => void;
}

export function AddWinModal({ isOpen, onClose, onSubmit }: AddWinModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'startup', label: 'Startup', icon: Rocket, color: 'purple' },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: 'green' },
    { id: 'learning', label: 'Learning', icon: BookOpen, color: 'blue' },
    { id: 'work', label: 'Work', icon: Briefcase, color: 'indigo' },
  ];

  const handleSubmit = () => {
    if (title.trim() && description.trim() && selectedCategory) {
      onSubmit({ title, description, category: selectedCategory });
      setTitle('');
      setDescription('');
      setSelectedCategory('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up">
        <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-gray-900">Share a Win 🎉</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you achieve?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your win..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 resize-none"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} strokeWidth={1.5} />
                    <span className="text-gray-900 text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screenshot Upload (Optional) */}
          <div>
            <label className="block text-gray-700 mb-2">Screenshot (optional)</label>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors">
              <Upload className="w-5 h-5" strokeWidth={1.5} />
              <span>Upload screenshot</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim() || !selectedCategory}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Share Win
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

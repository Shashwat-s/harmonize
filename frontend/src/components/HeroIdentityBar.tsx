import { Flame, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroIdentityBarProps {
  avatar: string;
  name: string;
  focusStatement: string;
  streakDays: number;
  respectScore: number;
}

export function HeroIdentityBar({ avatar, name, focusStatement, streakDays, respectScore }: HeroIdentityBarProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/60 border border-white/70 shadow-md p-6">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-50/30 to-blue-100/50 -z-10"></div>
      
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/80 shadow-md">
            <ImageWithFallback 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-gray-900">{name}</h1>
          <p className="text-gray-600 mt-1">{focusStatement}</p>
          
          {/* Stats badges */}
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200/50">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-orange-900 text-sm">{streakDays}-day streak</span>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200/50">
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-purple-900 text-sm">{respectScore} Respect</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
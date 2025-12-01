import { Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeedCardProps {
  userAvatar?: string;
  userName: string;
  timeAgo: string;
  title: string;
  subtext: string;
  thumbnail?: string;
  respectCount?: number;
  commentCount?: number;
  isCurrentUser?: boolean;
}

export function FeedCard({ 
  userAvatar, 
  userName, 
  timeAgo, 
  title, 
  subtext, 
  thumbnail,
  respectCount = 0,
  commentCount = 0,
  isCurrentUser = false
}: FeedCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/60 border border-white/70 shadow-md hover:shadow-xl transition-all duration-300 p-5">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {userAvatar && (
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/60 shadow-sm">
            <ImageWithFallback 
              src={userAvatar} 
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={isCurrentUser ? 'text-purple-900' : 'text-gray-900'}>{userName}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtext}</p>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <div className="rounded-2xl overflow-hidden mb-4 shadow-md">
          <ImageWithFallback 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-200/50">
        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Heart className="w-4 h-4" />
          <span className="text-sm">{respectCount > 0 ? respectCount : 'Respect'}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{commentCount > 0 ? commentCount : 'Comment'}</span>
        </button>
      </div>
    </div>
  );
}

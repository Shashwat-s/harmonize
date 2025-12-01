import { Home, Users, Plus, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  active?: string;
  onNavigate?: (tab: string) => void;
}

export function BottomNav({ active = 'Home', onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Allies', icon: Users, label: 'Allies' },
    { id: 'Add', icon: Plus, label: 'Add Win' },
    { id: 'Messages', icon: MessageCircle, label: 'Messages' },
    { id: 'Profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pb-safe-bottom pb-4 px-4 pointer-events-none">{/* Increased z-index and added safe area */}
      <div className="max-w-md w-full pointer-events-auto">
        <div className="backdrop-blur-2xl bg-white/70 border border-white/80 rounded-3xl shadow-2xl px-2 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              const isAddButton = item.id === 'Add';

              if (isAddButton) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate?.(item.id)}
                    className="relative -mt-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${isActive
                      ? 'text-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

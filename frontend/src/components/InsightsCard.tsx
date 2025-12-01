import { Trophy, Target, Users, TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  icon: 'trophy' | 'target' | 'users';
}

interface InsightsCardProps {
  title: string;
  stats: Stat[];
}

export function InsightsCard({ title, stats }: InsightsCardProps) {
  const icons = {
    trophy: Trophy,
    target: Target,
    users: Users,
  };

  return (
    <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-indigo-100/60 to-purple-100/60 border border-white/70 shadow-md p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl -z-10"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h3 className="text-gray-900">{title}</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = icons[stat.icon];
          return (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

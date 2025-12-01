import { useState } from 'react';
import { Flag, CheckCircle, Circle, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function JourneyTab() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([
    { id: 1, title: 'Launch MVP', progress: 80, deadline: 'Dec 2024' },
    { id: 2, title: 'Get 100 Users', progress: 20, deadline: 'Jan 2025' },
    { id: 3, title: 'Find Co-founder', progress: 50, deadline: 'Feb 2025' },
  ]);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Journey</h2>
        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Flag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-xs text-gray-500">Deadline: {goal.deadline}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-purple-600">{goal.progress}%</span>
            </div>

            <Progress value={goal.progress} className="h-2 bg-purple-100" />

            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-purple-600">
                Update Progress
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Milestones</h3>
        <div className="space-y-4 relative pl-4 border-l-2 border-purple-100">

          <div className="relative">
            <div className="absolute -left-[21px] top-1 bg-white p-1 rounded-full border border-purple-100">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-gray-800">Completed Onboarding Survey</p>
            <p className="text-xs text-gray-500">Yesterday</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[21px] top-1 bg-white p-1 rounded-full border border-purple-100">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-gray-800">Joined "AI Builders" Pod</p>
            <p className="text-xs text-gray-500">2 days ago</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[21px] top-1 bg-white p-1 rounded-full border border-purple-100">
              <Circle className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Post first win</p>
            <p className="text-xs text-gray-400">Pending</p>
          </div>

        </div>
      </div>
    </div>
  );
}

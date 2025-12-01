import { useState } from 'react';
import { Target, Code, Search, Users, Plus, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

// Inline editable text field component
function EditableField({
  value,
  onSave,
  placeholder = "Click to add...",
  multiline = false
}: {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
      toast.success('Updated successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 rounded-xl border border-purple-200 focus:border-purple-400 focus:outline-none resize-none"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 rounded-xl border border-purple-200 focus:border-purple-400 focus:outline-none"
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="px-4 py-3 bg-purple-50/80 rounded-xl border border-purple-100 cursor-pointer hover:bg-purple-100/80 transition-colors group"
    >
      <p className="text-gray-900">{value || placeholder}</p>
      <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to edit
      </span>
    </div>
  );
}

// Editable skills list component
function EditableSkillsList({
  skills,
  onSave,
  placeholder = "Click to add skills...",
  color = "green"
}: {
  skills: string[];
  onSave: (newSkills: string[]) => Promise<void>;
  placeholder?: string;
  color?: "green" | "orange";
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(skills.join(', '));
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const skillsArray = editValue.split(',').map(s => s.trim()).filter(Boolean);
      await onSave(skillsArray);
      setIsEditing(false);
      toast.success('Skills updated');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update skills');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(skills.join(', '));
    setIsEditing(false);
  };

  const colorClasses = {
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700"
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="Enter skills separated by commas"
          className="w-full px-4 py-3 bg-white/70 rounded-xl border border-purple-200 focus:border-purple-400 focus:outline-none"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="flex flex-wrap gap-2 p-3 rounded-xl border border-dashed border-gray-300 cursor-pointer hover:border-purple-300 transition-colors group"
    >
      {skills.length > 0 ? (
        skills.map(skill => (
          <span key={skill} className={`px-3 py-1.5 ${colorClasses[color]} rounded-full text-sm`}>
            {skill}
          </span>
        ))
      ) : (
        <span className="text-gray-500 text-sm">{placeholder}</span>
      )}
      <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto self-center">
        Click to edit
      </span>
    </div>
  );
}

export function ProfileTab() {
  const { user, updateUser } = useAuth();

  const handleUpdateField = async (field: string, value: any) => {
    try {
      const updatedData: any = {};

      if (field === 'currentFocus') {
        updatedData.currentFocus = value;
      } else if (field === 'careerGoal') {
        updatedData.goals = {
          ...user?.goals,
          career: [value]
        };
      } else if (field === 'skillsHave') {
        updatedData.skills = {
          ...user?.skills,
          have: value
        };
      } else if (field === 'skillsWant') {
        updatedData.skills = {
          ...user?.skills,
          wantToLearn: value
        };
      }

      // Optimistic update
      if (user) {
        updateUser({ ...user, ...updatedData });
      }

      await axios.put('/api/users/profile', updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-5 pb-20">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
        <span className="text-sm text-gray-500">Click any field to edit</span>
      </div>

      {/* Mission Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
          <h3 className="text-gray-900">Mission</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-gray-600 text-sm mb-2">Current Focus</div>
            <EditableField
              value={user?.currentFocus || ""}
              onSave={(value) => handleUpdateField('currentFocus', value)}
              placeholder="What are you working on right now?"
            />
          </div>

          <div>
            <div className="text-gray-600 text-sm mb-2">Main Goal</div>
            <EditableField
              value={user?.goals?.career?.[0] || ""}
              onSave={(value) => handleUpdateField('careerGoal', value)}
              placeholder="What is your main career goal?"
              multiline
            />
          </div>
        </div>
      </div>

      {/* Skill Stack Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
          <h3 className="text-gray-900">Skill Stack</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-gray-600 text-sm mb-2">I have</div>
            <EditableSkillsList
              skills={user?.skills?.have || []}
              onSave={(skills) => handleUpdateField('skillsHave', skills)}
              placeholder="Click to add your skills..."
              color="green"
            />
          </div>

          <div>
            <div className="text-gray-600 text-sm mb-2">I want to learn</div>
            <EditableSkillsList
              skills={user?.skills?.wantToLearn || []}
              onSave={(skills) => handleUpdateField('skillsWant', skills)}
              placeholder="Click to add skills you want to learn..."
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Looking For Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-pink-600" strokeWidth={1.5} />
          <h3 className="text-gray-900">Looking For</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Accountability partner', 'Co-founder', 'Just community'].map(item => (
            <span key={item} className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Coming soon: Customize your preferences</p>
      </div>

      {/* Pods Joined Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
            <h3 className="text-gray-900">Pods Joined</h3>
          </div>
          <span className="text-gray-600 text-sm">0</span>
        </div>

        <div className="space-y-3">
          <div className="text-center text-gray-500 py-4">
            No pods joined yet
          </div>

          {/* Join More Button */}
          <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            <span>Find pods</span>
          </button>
        </div>
      </div>
    </div>
  );
}

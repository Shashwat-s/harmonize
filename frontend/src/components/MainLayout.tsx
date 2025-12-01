import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeroIdentityBar } from './HeroIdentityBar';
import { BottomNav } from './BottomNav';
import { AddWinModal } from './AddWinModal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export function MainLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddWin, setShowAddWin] = useState(false);

    // Map current path to active nav item
    const getActiveNav = () => {
        const path = location.pathname;
        if (path.includes('/feed')) return 'Home';
        if (path.includes('/allies')) return 'Allies';
        if (path.includes('/messages')) return 'Messages';
        if (path.includes('/profile')) return 'Profile';
        return 'Home';
    };

    const handleNavClick = (tab: string) => {
        if (tab === 'Home') navigate('/feed');
        else if (tab === 'Allies') navigate('/allies');
        else if (tab === 'Messages') navigate('/messages');
        else if (tab === 'Profile') navigate('/profile');
        else if (tab === 'Add') setShowAddWin(true);
    };

    const handleAddWinSubmit = async (win: { title: string; description: string; category: string }) => {
        try {
            await axios.post('/api/posts', {
                content: win.title + "\n" + win.description,
                type: 'win',
                visibility: 'public'
            });
            setShowAddWin(false);
            // Navigate to feed to see the new post
            navigate('/feed');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Mobile container */}
            <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex flex-col">

                {/* Content wrapper with padding for bottom nav */}
                <div className="flex-1 px-4 pt-6 pb-28 space-y-6 overflow-y-auto">

                    {/* Hero Identity Bar - Common across all main pages */}
                    <HeroIdentityBar
                        avatar={user?.avatar || "https://github.com/shadcn.png"}
                        name={user?.name || "User"}
                        focusStatement={user?.currentFocus || "Finding my path"}
                        streakDays={user?.stats?.streak || 0}
                        respectScore={user?.stats?.respectScore || 0}
                    />

                    {/* Page Content */}
                    <Outlet />

                </div>

                {/* Bottom Navigation - Fixed at viewport bottom */}
                <BottomNav active={getActiveNav()} onNavigate={handleNavClick} />

                {/* Add Win Modal */}
                <AddWinModal
                    isOpen={showAddWin}
                    onClose={() => setShowAddWin(false)}
                    onSubmit={handleAddWinSubmit}
                />
            </div>
        </div>
    );
}

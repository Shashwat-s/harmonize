import { useState, useEffect } from 'react';
import { HeroIdentityBar } from '../components/HeroIdentityBar';
import { SegmentedControl } from '../components/SegmentedControl';
import { FeedCard } from '../components/FeedCard';
import { InsightsCard } from '../components/InsightsCard';
import { JourneyTab } from '../components/JourneyTab';
import { ProfileTab } from '../components/ProfileTab';
import { ChatTab } from '../components/ChatTab';
import { BottomNav } from '../components/BottomNav';
import { AddWinModal } from '../components/AddWinModal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface DashboardProps {
    defaultTab?: string;
}

export default function Dashboard({ defaultTab = 'Feed' }: DashboardProps) {
    const [selectedTab, setSelectedTab] = useState(defaultTab);
    const [activeNav, setActiveNav] = useState('Home');
    const [showAddWin, setShowAddWin] = useState(false);
    const { user } = useAuth();

    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedTab === 'Feed') {
            fetchPosts();
        }
    }, [selectedTab]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/posts/feed');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavClick = (tab: string) => {
        setActiveNav(tab);
        if (tab === 'Add') {
            setShowAddWin(true);
        } else if (tab === 'Profile') {
            setSelectedTab('Profile');
        } else if (tab === 'Home') {
            setSelectedTab('Feed');
        }
    };

    const handleAddWinSubmit = async (win: { title: string; description: string; category: string }) => {
        try {
            await axios.post('/api/posts', {
                content: win.title + "\n" + win.description,
                type: 'win',
                visibility: 'public'
            });
            setShowAddWin(false);
            fetchPosts(); // Refresh feed
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Mobile container */}
            <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm">
                {/* Content wrapper with padding for bottom nav */}
                <div className="px-4 pt-6 pb-32 space-y-6">

                    {/* Hero Identity Bar */}
                    <HeroIdentityBar
                        avatar={user?.avatar || "https://github.com/shadcn.png"}
                        name={user?.name || "User"}
                        focusStatement={user?.currentFocus || "Finding my path"}
                        streakDays={user?.stats?.streak || 0}
                        respectScore={user?.stats?.respectScore || 0}
                    />

                    {/* Segmented Control Tabs */}
                    <div className="flex justify-center">
                        <SegmentedControl
                            options={['Feed', 'Journey', 'Chat', 'Profile']}
                            selected={selectedTab}
                            onChange={setSelectedTab}
                        />
                    </div>

                    {/* Feed Content */}
                    {selectedTab === 'Feed' && (
                        <div className="space-y-5">

                            {isLoading ? (
                                <div className="text-center py-10">Loading feed...</div>
                            ) : posts.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    No posts yet. Share your first win!
                                </div>
                            ) : (
                                posts.map(post => (
                                    <FeedCard
                                        key={post._id}
                                        userAvatar={post.author?.avatar}
                                        userName={post.author?.name || 'Unknown User'}
                                        timeAgo={new Date(post.createdAt).toLocaleDateString()}
                                        title={post.content.split('\n')[0]} // Simple title extraction
                                        subtext={post.content.split('\n').slice(1).join('\n')}
                                        respectCount={post.likes?.length || 0}
                                        commentCount={post.comments?.length || 0}
                                        isCurrentUser={post.author?._id === user?._id}
                                    />
                                ))
                            )}

                            {/* Auto-Insights Section */}
                            <InsightsCard
                                title="Your 30-day Progress"
                                stats={[
                                    { label: 'Wins posted', value: user?.stats?.streak || 0, icon: 'trophy' },
                                    { label: 'Respect earned', value: user?.stats?.respectScore || 0, icon: 'target' },
                                ]}
                            />

                        </div>
                    )}

                    {/* Journey Content */}
                    {selectedTab === 'Journey' && <JourneyTab />}

                    {/* Chat Content */}
                    {selectedTab === 'Chat' && <ChatTab />}

                    {/* Profile Content */}
                    {selectedTab === 'Profile' && <ProfileTab />}

                </div>

                {/* Bottom Navigation */}
                <BottomNav active={activeNav} onNavigate={handleNavClick} />

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

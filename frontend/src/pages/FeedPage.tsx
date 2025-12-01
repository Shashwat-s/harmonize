import { useState, useEffect } from 'react';
import { FeedCard } from '../components/FeedCard';
import { InsightsCard } from '../components/InsightsCard';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function FeedPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/posts/feed');
            // Ensure we always set an array
            const postsData = Array.isArray(response.data) ? response.data : [];
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-5">{/* Removed relative positioning and floating button */}

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
    );
}

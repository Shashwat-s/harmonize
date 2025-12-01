import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet } from 'react-native';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function FeedScreen() {
    const [posts, setPosts] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const fetchPosts = async () => {
        try {
            const response = await client.get('/posts/feed');
            setPosts(Array.isArray(response.data.posts) ? response.data.posts : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: item.author?.avatar || 'https://github.com/shadcn.png' }} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{item.author?.name}</Text>
                    <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.footer}>
                <Text style={styles.respect}>{item.respectCount || 0} Respect</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Feed</Text>
                <Image source={{ uri: user?.avatar || 'https://github.com/shadcn.png' }} style={styles.profilePic} />
            </View>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No posts yet</Text></View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', paddingTop: 48 },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    profilePic: { width: 32, height: 32, borderRadius: 16 },
    card: { backgroundColor: 'white', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    name: { fontWeight: 'bold', color: '#111827', fontSize: 15 },
    date: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    content: { color: '#111827', marginBottom: 8, lineHeight: 22, fontSize: 15 },
    footer: { paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
    respect: { color: '#9333ea', fontSize: 13, fontWeight: '600' },
    empty: { padding: 32, alignItems: 'center' },
    emptyText: { color: '#6b7280', fontSize: 15 },
});

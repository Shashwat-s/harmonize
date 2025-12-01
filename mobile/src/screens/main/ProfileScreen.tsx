import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: user?.avatar || 'https://github.com/shadcn.png' }} style={styles.image} />
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            <View style={styles.stats}>
                <Text style={styles.statsTitle}>Stats</Text>
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{user?.stats?.streak || 0}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={[styles.statValue, { color: '#ec4899' }]}>{user?.stats?.respectScore || 0}</Text>
                        <Text style={styles.statLabel}>Respect</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', paddingTop: 48, paddingHorizontal: 16 },
    profile: { alignItems: 'center', marginBottom: 32 },
    image: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
    email: { fontSize: 15, color: '#6b7280' },
    stats: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    statsTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
    stat: { alignItems: 'center' },
    statValue: { fontSize: 28, fontWeight: 'bold', color: '#9333ea', marginBottom: 4 },
    statLabel: { fontSize: 12, color: '#6b7280' },
    button: { backgroundColor: '#fef2f2', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#fee2e2' },
    buttonText: { color: '#dc2626', fontSize: 16, fontWeight: 'bold' },
});

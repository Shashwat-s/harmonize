import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import client from '../../api/client';

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await client.post('/auth/register', { name, email, password });
            Alert.alert('Success', 'Account created! Please login.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Join Harmonize</Text>
                    <Text style={styles.subtitle}>Find your allies</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} placeholder="Alex" value={name} onChangeText={setName} />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="m@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />

                    <TouchableOpacity onPress={handleRegister} disabled={isLoading} style={styles.button}>
                        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Sign in</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3e8ff' },
    content: { flex: 1, justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 32 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#9333ea', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#6b7280' },
    form: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 },
    input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 16 },
    button: { backgroundColor: '#9333ea', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    linkText: { textAlign: 'center', color: '#6b7280', fontSize: 14 },
    linkBold: { color: '#9333ea', fontWeight: 'bold' },
});

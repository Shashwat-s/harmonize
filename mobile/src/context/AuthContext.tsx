import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import client from '../api/client';
import { User, AuthResponse } from '../types/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: AuthResponse) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                const storedUser = await SecureStore.getItemAsync('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    client.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                }
            } catch (error) {
                console.error('Failed to load user', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (userData: AuthResponse) => {
        await SecureStore.setItemAsync('token', userData.token);
        await SecureStore.setItemAsync('user', JSON.stringify(userData));
        setToken(userData.token);
        setUser(userData);
        client.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        setToken(null);
        setUser(null);
        delete client.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

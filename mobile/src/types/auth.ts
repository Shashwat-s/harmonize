export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    stats?: {
        streak: number;
        respectScore: number;
    };
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    token: string;
}

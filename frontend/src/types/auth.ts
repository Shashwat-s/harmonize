export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    currentFocus?: string;
    goals?: {
        career?: string[];
        personal?: string[];
        networking?: string[];
        finance?: string[];
    };
    skills?: {
        have: string[];
        wantToLearn: string[];
    };
    stats?: {
        streak: number;
        respectScore: number;
        badges: string[];
    };
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    token: string;
}

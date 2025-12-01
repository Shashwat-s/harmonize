import jwt from 'jsonwebtoken';


interface TokenPayload {
    userId: string;
}

export const generateToken = (userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });

    return token;
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

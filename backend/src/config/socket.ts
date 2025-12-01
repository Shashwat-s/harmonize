import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';

interface DecodedToken {
    userId: string;
}

export const configureSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*', // Allow all origins for now, restrict in production
            methods: ['GET', 'POST']
        }
    });

    // Middleware for authentication
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            socket.data.userId = decoded.userId;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.data.userId}`);

        // Join a room with their own user ID to receive private messages
        socket.join(socket.data.userId);

        socket.on('send_message', async (data: { receiverId: string; content: string }) => {
            try {
                const { receiverId, content } = data;
                const senderId = socket.data.userId;

                // Save message to database
                const message = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content,
                    read: false
                });

                // Emit to receiver
                io.to(receiverId).emit('receive_message', message);

                // Emit back to sender (for confirmation/optimistic UI)
                socket.emit('message_sent', message);

            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.data.userId}`);
        });
    });

    return io;
};

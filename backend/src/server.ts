import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import connectDB from './config/database.js';
import { configureSocket } from './config/socket.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

connectDB();

const app: Express = express();
const httpServer = createServer(app);

// Configure Socket.io
configureSocket(httpServer);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

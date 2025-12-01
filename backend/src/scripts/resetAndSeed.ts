import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import User from '../models/User';
import Post from '../models/Post';
import Match from '../models/Match';
import Message from '../models/Message';
import Survey from '../models/Survey';
import Comment from '../models/Comment';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const testUser = {
    name: 'Alex Johnson',
    email: 'test@example.com',
    password: 'Test123!',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Software engineer passionate about building meaningful connections and personal growth.',
    currentFocus: 'Building a successful startup while maintaining work-life balance',
    location: 'San Francisco, CA',
    goals: {
        career: ['Launch my own SaaS product', 'Become a tech lead', 'Learn system design'],
        personal: ['Run a marathon', 'Learn Spanish', 'Read 24 books this year'],
        networking: ['Find a business co-founder', 'Connect with senior engineers', 'Join a mastermind group'],
        finance: ['Save $50k for startup', 'Learn about investing', 'Build passive income streams']
    },
    skills: {
        have: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'Product Management'],
        wantToLearn: ['Go', 'Kubernetes', 'Machine Learning', 'System Design', 'Leadership']
    },
    lifestyle: {
        sleepSchedule: 'Early bird (6am-10pm)',
        workHours: '9am-6pm with flexible breaks',
        fitnessHabits: 'Gym 4x/week, running on weekends',
        communicationStyle: 'Direct and collaborative',
        introvertExtrovertScale: 6
    },
    stats: {
        streak: 5,
        lastActive: new Date(),
        respectScore: 120,
        badges: ['Early Adopter', 'Week Warrior', 'Connection Maker']
    }
};

async function resetAndSeed() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✓ Connected to MongoDB');

        // Clear all collections
        console.log('\nClearing all collections...');
        await User.deleteMany({});
        console.log('✓ Cleared Users');
        await Post.deleteMany({});
        console.log('✓ Cleared Posts');
        await Match.deleteMany({});
        console.log('✓ Cleared Matches');
        await Message.deleteMany({});
        console.log('✓ Cleared Messages');
        await Survey.deleteMany({});
        console.log('✓ Cleared Surveys');
        await Comment.deleteMany({});
        console.log('✓ Cleared Comments');

        // Hash password
        console.log('\nCreating test user...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);

        // Create test user
        const user = await User.create({
            ...testUser,
            password: hashedPassword
        });

        console.log('\n=============================================');
        console.log('✓ DATABASE RESET COMPLETE');
        console.log('=============================================');
        console.log('\n📝 TEST USER CREDENTIALS:');
        console.log('─────────────────────────────────────────────');
        console.log(`Email:    ${testUser.email}`);
        console.log(`Password: ${testUser.password}`);
        console.log(`Name:     ${testUser.name}`);
        console.log(`User ID:  ${user._id}`);
        console.log('─────────────────────────────────────────────');
        console.log('\n✨ You can now login with these credentials!');
        console.log('=============================================\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error);
        process.exit(1);
    }
}

// Run the script
resetAndSeed();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harmonize';

// Define schemas (simplified versions)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    currentFocus: String,
    goals: {
        career: [String],
        personal: [String],
        learning: [String]
    },
    skills: {
        have: [String],
        wantToLearn: [String]
    },
    stats: {
        streak: Number,
        respectScore: Number
    },
    avatar: String,
    createdAt: { type: Date, default: Date.now }
});

async function resetDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected successfully!');

        // Drop all collections
        const collections = await mongoose.connection.db.collections();
        console.log(`\nDropping ${collections.length} collections...`);

        for (let collection of collections) {
            await collection.drop();
            console.log(`Dropped: ${collection.collectionName}`);
        }

        console.log('\n✅ All data cleared!');

        // Create new test user
        console.log('\nCreating test user...');
        const User = mongoose.model('User', userSchema);

        const hashedPassword = await bcrypt.hash('password123', 10);

        const testUser = await User.create({
            name: 'Test Hustler',
            email: 'hustler2@example.com',
            password: hashedPassword,
            currentFocus: 'Building the next big thing in social tech',
            goals: {
                career: ['Launch Harmonize MVP by Q1 2025', 'Grow to 10K users by end of 2025'],
                personal: ['Maintain work-life balance', 'Build meaningful connections'],
                learning: ['Advanced MongoDB', 'System Design', 'UI/UX Best Practices']
            },
            skills: {
                have: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Product Design'],
                wantToLearn: ['Marketing', 'Growth Hacking', 'AI/ML', 'Mobile Development']
            },
            stats: {
                streak: 7,
                respectScore: 45
            },
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hustler2'
        });

        console.log('\n✅ Test user created:');
        console.log(`   Email: ${testUser.email}`);
        console.log(`   Password: password123`);
        console.log(`   Name: ${testUser.name}`);
        console.log(`   ID: ${testUser._id}`);

        console.log('\n🎉 Database reset complete!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
        process.exit(0);
    }
}

resetDatabase();

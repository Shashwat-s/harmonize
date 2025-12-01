import User from '../models/User.js';
import Survey from '../models/Survey.js';

// Helper to calculate similarity between two arrays
const calculateArraySimilarity = (arr1: string[], arr2: string[]) => {
    if (!arr1 || !arr2 || arr1.length === 0 || arr2.length === 0) return 0;
    const intersection = arr1.filter(item => arr2.includes(item));
    const union = new Set([...arr1, ...arr2]);
    return (intersection.length / union.size) * 100;
};

export const calculateCompatibility = async (user1Id: string, user2Id: string): Promise<number> => {
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);
    const survey1 = await Survey.findOne({ user: user1Id });
    const survey2 = await Survey.findOne({ user: user2Id });

    if (!user1 || !user2) return 0;

    let score = 0;
    let weights = {
        goals: 0.4,
        skills: 0.2,
        lifestyle: 0.2,
        survey: 0.2
    };

    // 1. Goal Compatibility (40%)
    const careerScore = calculateArraySimilarity(user1.goals.career || [], user2.goals.career || []);
    const personalScore = calculateArraySimilarity(user1.goals.personal || [], user2.goals.personal || []);
    const goalScore = (careerScore + personalScore) / 2;
    score += goalScore * weights.goals;

    // 2. Skill Compatibility (20%)
    // Logic: If user1 wants to learn what user2 has, that's a good match
    const learnHave1 = calculateArraySimilarity(user1.skills.wantToLearn, user2.skills.have);
    const learnHave2 = calculateArraySimilarity(user2.skills.wantToLearn, user1.skills.have);
    const skillScore = (learnHave1 + learnHave2) / 2;
    score += skillScore * weights.skills;

    // 3. Lifestyle Compatibility (20%)
    let lifestyleScore = 0;
    if (user1.lifestyle.introvertExtrovertScale && user2.lifestyle.introvertExtrovertScale) {
        // Similar energy levels might be good, or complementary. Let's assume similar for now.
        const diff = Math.abs(user1.lifestyle.introvertExtrovertScale - user2.lifestyle.introvertExtrovertScale);
        lifestyleScore += (10 - diff) * 10; // Max 100
    }
    // Add more lifestyle checks here...
    score += lifestyleScore * weights.lifestyle;

    // 4. Survey Response Compatibility (20%)
    // This would require detailed parsing of survey answers
    // For now, we'll assume a baseline similarity if they both completed it
    if (survey1 && survey2) {
        score += 50 * weights.survey; // Placeholder
    }

    return Math.min(Math.round(score), 100);
};

import User from '../models/User.js';

export const updateStreak = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const lastActive = new Date(user.stats.lastActive);

    // Check if last active was yesterday (continuation of streak)
    const isYesterday = (
        now.getDate() - lastActive.getDate() === 1 &&
        now.getMonth() === lastActive.getMonth() &&
        now.getFullYear() === lastActive.getFullYear()
    );

    // Check if last active was today (no change)
    const isToday = (
        now.getDate() === lastActive.getDate() &&
        now.getMonth() === lastActive.getMonth() &&
        now.getFullYear() === lastActive.getFullYear()
    );

    if (isYesterday) {
        user.stats.streak += 1;
    } else if (!isToday) {
        // Streak broken
        user.stats.streak = 1;
    }

    user.stats.lastActive = now;
    await user.save();
};

export const awardBadge = async (userId: string, badgeName: string) => {
    const user = await User.findById(userId);
    if (!user) return;

    if (!user.stats.badges.includes(badgeName)) {
        user.stats.badges.push(badgeName);
        await user.save();
        return true; // Badge awarded
    }

    return false; // Badge already owned
};

export const updateRespectScore = async (userId: string, amount: number) => {
    const user = await User.findById(userId);
    if (!user) return;

    user.stats.respectScore += amount;
    await user.save();
};

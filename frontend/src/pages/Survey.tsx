import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from '../components/onboarding/WelcomeScreen';
import { ChooseFocusScreen } from '../components/onboarding/ChooseFocusScreen';
import { ChooseGoalScreen } from '../components/onboarding/ChooseGoalScreen';
import { WhatYouWantScreen } from '../components/onboarding/WhatYouWantScreen';
import { SuccessScreen } from '../components/onboarding/SuccessScreen';
import axios from 'axios';
import { toast } from 'sonner';

interface UserData {
    focus: string;
    goal: string;
    wants: string[];
}

export default function Survey() {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState<UserData>({ focus: '', goal: '', wants: [] });
    const navigate = useNavigate();

    const handleWelcomeNext = () => setStep(1);

    const handleFocusNext = (focus: string) => {
        setUserData(prev => ({ ...prev, focus }));
        setStep(2);
    };

    const handleGoalNext = (goal: string) => {
        setUserData(prev => ({ ...prev, goal }));
        setStep(3);
    };

    const handleWantsNext = (wants: string[]) => {
        setUserData(prev => ({ ...prev, wants }));
        setStep(4);
    };

    const handleOnboardingComplete = async () => {
        try {
            // Submit survey data to backend
            await axios.post('/api/survey/submit', {
                responses: [
                    { questionId: 'focus', answer: userData.focus, category: 'goals' },
                    { questionId: 'goal', answer: userData.goal, category: 'goals' },
                    { questionId: 'wants', answer: userData.wants, category: 'skills' }
                ]
            });

            // Update user profile with focus
            await axios.put('/api/users/profile', {
                currentFocus: userData.focus
            });

            toast.success('Profile setup complete!');
            navigate('/feed');
        } catch (error) {
            console.error('Error submitting survey:', error);
            toast.error('Failed to save your preferences');
        }
    };

    switch (step) {
        case 0:
            return <WelcomeScreen onNext={handleWelcomeNext} />;
        case 1:
            return (
                <ChooseFocusScreen
                    onNext={handleFocusNext}
                    onBack={() => setStep(0)}
                />
            );
        case 2:
            return (
                <ChooseGoalScreen
                    focus={userData.focus}
                    onNext={handleGoalNext}
                    onBack={() => setStep(1)}
                />
            );
        case 3:
            return (
                <WhatYouWantScreen
                    onNext={handleWantsNext}
                    onBack={() => setStep(2)}
                />
            );
        case 4:
            return <SuccessScreen onComplete={handleOnboardingComplete} />;
        default:
            return <WelcomeScreen onNext={handleWelcomeNext} />;
    }
}

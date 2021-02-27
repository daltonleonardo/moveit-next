import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenger: () => void;
    resetChallenge: () => void;
    experienceToNextlevel: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextlevel = Math.pow((level + 1) * 4 , 2);


    function levelUp() {
      setLevel(level + 1);

    }

    function startNewChallenger() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
    <ChallengesContext.Provider value={{ 
        level, 
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenger,
        activeChallenge,
        resetChallenge,
        experienceToNextlevel
        }}>
        { children }
    </ChallengesContext.Provider>
    );


}




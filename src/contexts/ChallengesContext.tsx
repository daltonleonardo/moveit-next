import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';


interface ChallengesProviderProps {
    children: ReactNode;
    level: number
    currentExperience: number 
    challengesCompleted: number;
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
    completeChallenge: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest
    } : ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextlevel = Math.pow((level + 1) * 4 , 2);

    //Vai ser executado uma única vez, por conta do array vazio.
    useEffect(() => {
        Notification.requestPermission();
    }, [])


    //Vai disparar um atualização sempre que tiver uma atualização nos objetos abaixo.
    useEffect(() => {
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengesCompleted',String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
      setLevel(level + 1);

    }

    function startNewChallenger() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission ==='granted') {
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return ;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextlevel) {
            finalExperience = finalExperience - experienceToNextlevel;
            levelUp();
        }
        
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
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
        experienceToNextlevel,
        completeChallenge
        }}>
        { children }
    </ChallengesContext.Provider>
    );


}




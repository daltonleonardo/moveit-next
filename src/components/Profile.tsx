import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
const { level }  = useContext(ChallengesContext);

    return (
        <div className={ styles.profileContainer }>
            <img src="https://avatars.githubusercontent.com/u/5472690?s=460&u=01d29459db23aed7faf765303559b3dd68b22045&v=4" alt="Dalton Sergio Leonardo"></img>
            <div>
                <strong>Dalton Sergio Leonardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"></img>
                    Level {level}
                </p>
            </div>
        
        </div>
    );
}
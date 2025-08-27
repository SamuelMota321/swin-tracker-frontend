import { useMemo } from 'react';
import styles from '../styles.module.scss';

// Função para formatar o tempo da parcial (ex: 22.17)
const formatSplitTime = (timeInSeconds) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) return "00.00";
    
    const seconds = Math.floor(timeInSeconds);
    const hundredths = Math.round((timeInSeconds - seconds) * 100);

    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedHundredths = String(hundredths).padStart(2, '0');

    return `${formattedSeconds}.${formattedHundredths}`;
};

// Função para formatar o tempo acumulado (ex: 1:22:39)
const formatCumulativeTime = (timeInSeconds) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) return "00:00.00";

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const hundredths = Math.round((timeInSeconds - Math.floor(timeInSeconds)) * 100);

    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedHundredths = String(hundredths).padStart(2, '0');

    if (minutes > 0) {
        return `${formattedMinutes}:${formattedSeconds}.${formattedHundredths}`;
    }
    return `${formattedSeconds}.${formattedHundredths}`;
}


export const AthleteCard = ({ name, competition, proof, partials }) => { 
    // Processa os dados das parciais para calcular os tempos acumulados
    const processedPartials = useMemo(() => {
        if (!partials || partials.length === 0) return [];

        let cumulativeTime = 0;

        // Filtra parciais com tempo nulo e calcula o tempo acumulado
        return partials
            .filter(p => typeof p.time === 'number') 
            .map(p => {
                const splitTime = p.time;
                cumulativeTime += splitTime;

                return {
                    distance: p.meters,
                    splitTime: formatSplitTime(splitTime),
                    cumulativeTime: formatCumulativeTime(cumulativeTime),
                };
            });
    }, [partials]);

    return (
        <li className={styles.athleteCard}>
            <div className={styles.athleteHeader}>
                <h3>{name}</h3>
                <div className={styles.tags}>
                    <span className={styles.tag}>{competition}</span>
                    <span className={styles.tag}>{proof}</span>
                </div>
            </div>
            
            <div className={styles.timeCards}>
                {processedPartials.map((p) => (
                    <div key={p.distance} className={styles.timeCard}>
                        <div className={styles.distance}>{p.distance}</div>
                        <div className={styles.time}>{p.splitTime}</div>
                        <div className={styles.split}>{p.cumulativeTime}</div>
                    </div>
                ))}
            </div>
        </li>
    )
}
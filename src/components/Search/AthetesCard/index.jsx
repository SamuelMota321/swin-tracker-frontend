import { useMemo, useState } from 'react'; // 1. Importe o useState
import styles from '../styles.module.scss';
import { FaChevronDown } from 'react-icons/fa'; // 2. Importe um ícone

// Funções de formatação de tempo (permanecem as mesmas)
const formatSplitTime = (timeInSeconds) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) return "00.00";
    const seconds = Math.floor(timeInSeconds);
    const hundredths = Math.round((timeInSeconds - seconds) * 100);
    return `${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
};
const formatCumulativeTime = (timeInSeconds) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) return "00:00.00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const hundredths = Math.round((timeInSeconds - Math.floor(timeInSeconds)) * 100);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedHundredths = String(hundredths).padStart(2, '0');
    return minutes > 0 ? `${minutes}:${formattedSeconds}.${formattedHundredths}` : `${formattedSeconds}.${formattedHundredths}`;
};

export const AthleteCard = ({ athleteName, competitionName, proof, partials }) => { 
    // 3. Adiciona o estado para controlar se o card está expandido
    const [isExpanded, setIsExpanded] = useState(false);

    const processedPartials = useMemo(() => {
        if (!partials || partials.length === 0) return [];
        let cumulativeTime = 0;
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

    // 4. Função para alternar o estado de expandido/recolhido
    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        // 5. Adiciona o evento de clique no card inteiro
        <li className={styles.athleteCard} onClick={toggleExpand}>
            <div className={styles.athleteHeader}>
                <div className={styles.athleteInfo}>
                    <h3>{athleteName}</h3>
                    <div className={styles.tags}>
                        <span className={styles.tag}>{competitionName}</span>
                        <span className={styles.tag}>{proof}</span>
                    </div>
                </div>
                {/* Adiciona o ícone que gira quando expandido */}
                <FaChevronDown className={`${styles.toggleIcon} ${isExpanded ? styles.expanded : ''}`} />
            </div>
            
            {/* 6. As parciais só serão renderizadas se 'isExpanded' for true */}
            {isExpanded && (
                <div className={styles.timeCards}>
                    {processedPartials.map((p) => (
                        <div key={p.distance} className={styles.timeCard}>
                            <div className={styles.distance}>{p.distance}</div>
                            <div className={styles.time}>{p.splitTime}</div>
                            <div className={styles.split}>{p.cumulativeTime}</div>
                        </div>
                    ))}
                </div>
            )}
        </li>
    );
};
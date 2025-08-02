import styles from '../styles.module.scss'

export const AthleteCard = ({ name, competition, proof, partials }) => { 
    // Simular dados de tempos para demonstração
    const mockTimes = [
        { distance: "50", time: "22:17", split: "00:00", color: "card50" },
        { distance: "100", time: "24:22", split: "46:39", color: "card100" },
        { distance: "150", time: "27:22", split: "1:22:39", color: "card150" },
        { distance: "200", time: "26:22", split: "1:48:61", color: "card200" }
    ]

    return (
        <li className={styles.athleteCard}>
            <div className={styles.athleteHeader}>
                <h3>{name}</h3>
                <div className={styles.competitionInfo}>
                    <div className={styles.competition}>{competition || "Torneio de Abertura"}</div>
                    <div className={styles.event}>{proof || "200 Livre"}</div>
                </div>
            </div>
            
            <div className={styles.timeCards}>
                {mockTimes.map((timeData, index) => (
                    <div key={index} className={`${styles.timeCard} ${styles[timeData.color]}`}>
                        <div className={styles.distance}>{timeData.distance}</div>
                        <div className={styles.time}>{timeData.time}</div>
                        <div className={styles.split}>{timeData.split}</div>
                    </div>
                ))}
            </div>
        </li>
    )
}
import styles from '../styles.module.scss'

export const AthleteCard = ({ name, competition, proof, partials }) => { 
    return (
        <li className={styles.athleteCard}>
            <p>{name}</p>
        </li>
    )
}
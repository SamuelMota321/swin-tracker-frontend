import { useEffect } from "react";
import { Controller } from "react-hook-form";
import styles from "./styles.module.scss";

export const SeriesCard = ({ proofIndex, setValue, athleteList, control, seriesIndex, errors, onSeriesRemove }) => {
  const selectedPath = `proofs.${proofIndex}.series.${seriesIndex}.athletes`;
  const seriesIndexPath = `proofs.${proofIndex}.series.${seriesIndex}.serieNumber`;

  useEffect(() => {
    setValue(seriesIndexPath, seriesIndex + 1);
  }, [seriesIndex, seriesIndexPath, setValue]);

  return (
    <div className={styles.seriesCard}>
      <div className={styles.seriesHeader}>
        <label>Atletas da Série {seriesIndex + 1}:</label>
        <button 
          type="button" 
          onClick={() => onSeriesRemove(seriesIndex)}
          className={styles.removeButton}
        >
          Remover série
        </button>
      </div>

      <Controller
        control={control}
        name={selectedPath}
        render={({ field }) => {
          const handleToggle = (athleteId) => {
            const current = field.value || [];
            const updated = current.includes(athleteId)
              ? current.filter((id) => id !== athleteId)
              : [...current, athleteId];
            field.onChange(updated);
          };

          return (
            <div className={styles.athletesList}>
              {athleteList.map((athlete) => (
                <div key={athlete.id} className={styles.athleteItem}>
                  <input
                    type="checkbox"
                    id={`proof-${proofIndex}-series-${seriesIndex}-athlete-${athlete.id}`}
                    checked={(field.value || []).includes(athlete.id)}
                    onChange={() => handleToggle(athlete.id)}
                  />
                  <label htmlFor={`proof-${proofIndex}-series-${seriesIndex}-athlete-${athlete.id}`}>
                    {athlete.name}
                  </label>
                </div>
              ))}
            </div>
          );
        }}
      />

      {errors?.proofs?.[proofIndex]?.series?.[seriesIndex]?.athletes && (
        <p className={styles.error}>
          {errors.proofs[proofIndex].series[seriesIndex].athletes.message}
        </p>
      )}
    </div>
  );
}
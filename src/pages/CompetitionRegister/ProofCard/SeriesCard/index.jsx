import { useEffect } from "react";
import { Controller } from "react-hook-form";

export const SeriesCard = ({ proofIndex, setValue, athleteList, control, seriesIndex, seriesField, seriesFieldArray, onSeriesRemove }) => {
  const selectedPath = `proofs.${proofIndex}.series.${seriesIndex}.athletes`;
  const seriesIndexPath = `proofs.${proofIndex}.series.${seriesIndex}.serieNumber`;

  useEffect(() => {
    setValue(seriesIndexPath, seriesIndex + 1);
  }, [seriesIndex, seriesIndexPath, setValue]);

  return (
    <div key={`proofs.${proofIndex}.series.${seriesIndex}`}>
      <label>Atletas da Série {seriesIndex + 1}:</label>
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
            <div>
              {athleteList.map((athlete) => (
                <div key={athlete.id}>
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
        <p>
          {errors.proofs[proofIndex].series[seriesIndex].athletes.message}
        </p>
      )}

      <button type="button" onClick={() => onSeriesRemove(seriesIndex)}>
        Remover série
      </button>
    </div>
  );
}
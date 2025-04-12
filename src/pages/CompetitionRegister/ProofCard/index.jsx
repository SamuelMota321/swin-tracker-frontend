import { useFieldArray } from "react-hook-form";
import { Select } from "../../../components/Select";
import { SeriesCard } from "./SeriesCard";
import { useEffect } from "react";

export const ProofCard = ({ proofIndex, control, register, errors, setValue, athleteList, onRemoveProof, }) => {
  const seriesFieldArray = useFieldArray({
    control,
    name: `proofs.${proofIndex}.series`
  });

  const proofPath = `proofs.${proofIndex}.proofOrder`
  
  useEffect(() => {
    setValue(proofPath, proofIndex + 1);
  }, [proofIndex, proofPath, setValue]);

  return (
    <div key={`proof-${proofIndex}`}>
      <h4>Prova {proofIndex + 1}</h4>

      <Select
        label="Metragem:"
        values={["Selecione a metragem da prova", 50, 100, 200, 400, 800, 1500]}
        {...register(`proofs.${proofIndex}.distance`, { valueAsNumber: true })}
        error={errors.proofs?.[proofIndex]?.distance?.message}
      />

      <Select
        label="Estilo:"
        values={["Selecione o estilo de prova", "Borboleta", "Crawl", "Peito", "Costas", "Medley"]}
        {...register(`proofs.${proofIndex}.styleType`)}
        error={errors.proofs?.[proofIndex]?.styleType?.message}
      />

      <h5>Séries</h5>
      {seriesFieldArray.fields.map((seriesField, seriesIndex) => (
        <SeriesCard
          key={seriesField.id}
          proofIndex={proofIndex}
          control={control}
          setValue={setValue}
          athleteList={athleteList}
          seriesIndex={seriesIndex}
          errors={errors}
          onSeriesRemove={() => seriesFieldArray.remove(seriesIndex)}
        />

      ))}

      <button
        type="button"
        onClick={() => seriesFieldArray.append({ distance: 0, styleType: "", selectedAthletes: [] })}
      >
        Adicionar série
      </button>

      <button type="button" onClick={() => onRemoveProof(proofIndex)}>Remover prova</button>
    </div>
  );
};
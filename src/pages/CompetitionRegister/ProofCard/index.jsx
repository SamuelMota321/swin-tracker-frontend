import { Controller, useFieldArray } from "react-hook-form";
import { Select } from "../../../components/Select";

export const ProofCard = ({ proofIndex, control, register, errors, watch, setValue, athleteList, onRemoveProof }) => {
    const seriesFieldArray = useFieldArray({
        control,
        name: `proofs.${proofIndex}.series`
    });

    return (
        <div key={`proof-${proofIndex}`} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
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
            {seriesFieldArray.fields.map((seriesField, seriesIndex) => {
                
                const selectedPath = `proofs.${proofIndex}.series.${seriesIndex}.selectedAthletes`;

                return (
                    <div
                        key={seriesField.id}
                        style={{ padding: "10px", border: "1px dashed gray", marginBottom: "10px" }}
                    >
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

                        {errors?.proofs?.[proofIndex]?.series?.[seriesIndex]?.selectedAthletes && (
                            <p style={{ color: "red", marginTop: "5px" }}>
                                {errors.proofs[proofIndex].series[seriesIndex].selectedAthletes.message}
                            </p>
                        )}

                        <button type="button" onClick={() => seriesFieldArray.remove(seriesIndex)}>
                            Remover série
                        </button>
                    </div>
                );
            })}


            <button
                type="button"
                onClick={() => seriesFieldArray.append({ selectedAthletes: [] })}
            >
                Adicionar série
            </button>

            <button type="button" onClick={() => onRemoveProof(proofIndex)}>Remover prova</button>
        </div>
    );
};
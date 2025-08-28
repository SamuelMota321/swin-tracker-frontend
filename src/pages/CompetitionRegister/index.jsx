import { useContext, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppContext } from "../../providers/AppContext";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import { competitionRegisterSchema } from "../../schemas/competitionRegisterSchema";
import { ProofCard } from "./ProofCard";
import styles from "./styles.module.scss";

export const CompetitionRegister = () => {
    // 1. Pega o estado 'isLoading' do contexto
    const { competitionRegister, getAthleteList, athleteList, isLoading } = useContext(AppContext);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(competitionRegisterSchema),
        defaultValues: { name: "", date: "", poolType: "", proofs: [] }
    });

    const proofs = useFieldArray({ name: "proofs", control });

    const onSubmit = (formData) => {
        competitionRegister(formData)
    };

    useEffect(() => {
        getAthleteList();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>Cadastro de Torneio</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.basicInfo}>
                        <Input 
                            label="Nome:" 
                            placeholder="Nome do torneio"
                            {...register("name")} 
                            error={errors.name} 
                        />
                        <Input 
                            label="Data:" 
                            type="date" 
                            {...register("date")} 
                            error={errors.date} 
                        />
                        <Select
                            label="Tipo de piscina:"
                            values={["Selecione um tipo de piscina", "25", "50"]}
                            {...register("poolType")}
                            error={errors.poolType}
                        />
                    </div>

                    <div className={styles.proofsSection}>
                        <h3 className={styles.sectionTitle}>Provas</h3>
                        {proofs.fields.map((proofField, proofIndex) => (
                            <ProofCard
                                key={proofField.id}
                                proofIndex={proofIndex}
                                control={control}
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                athleteList={athleteList}
                                onRemoveProof={() => proofs.remove(proofIndex)}
                            />
                        ))}

                        <button
                            type="button"
                            className={styles.addProofButton}
                            onClick={() => proofs.append({ distance: 0, styleType: "", series: [] })}
                            disabled={isLoading} // Também desabilita este botão
                        >
                            + Adicionar prova
                        </button>
                    </div>

                    <Button 
                        type="submit" 
                        // 2. Muda o texto e desabilita o botão com base no 'isLoading'
                        text={isLoading ? "Criando..." : "Criar Torneio"} 
                        className={styles.submitButton}
                        size="large"
                        disabled={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};
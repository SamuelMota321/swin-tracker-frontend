import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppContext } from "../../providers/AppContext";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import { competitionRegisterSchema } from "../../schemas/competitionRegisterSchema";
import { ProofCard } from "./ProofCard";

export const CompetitionRegister = () => {
    const { competitionRegister, getAthleteList, athleteList } = useContext(AppContext);
    const navigate = useNavigate();

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
        console.log("Dados válidos:", formData);
        // competitionRegister(formData)
    };

    useEffect(() => {
        getAthleteList();
    }, []);

    return (
        <div>
            <h2>Cadastro de Torneio</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Nome:" {...register("name")} error={errors.name} />
                <Input label="Data:" type="date" {...register("date")} error={errors.date} />

                <Select
                    label="Tipo de piscina:"
                    values={["Selecione um tipo de piscina", "25M", "50M"]}
                    {...register("poolType")}
                    error={errors.poolType}
                />

                <h3>Provas</h3>
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
                    onClick={() => proofs.append({ distance: 0, styleType: "", series: [] })}
                >
                    Adicionar prova
                </button>

                <Button type="submit" text="Enviar"/>
            </form>
        </div>
    );
};
import { useState, useEffect, forwardRef, useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { partialSchema } from '../../schemas/partialSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPen } from "react-icons/fa";
import { Button } from '../Button';
import { AppContext } from '../../providers/AppContext';
import styles from './styles.module.scss';
import inputStyles from '../Input/styles.module.scss';
import { toast } from 'react-toastify';

const TimeInput = forwardRef(({ label, name, error, onChange: rhfOnChange, onBlur: rhfOnBlur, value: propValue, ...rest }, ref) => {
  const [displayValue, setDisplayValue] = useState('');
  useEffect(() => { setDisplayValue(propValue ? String(propValue).replace(/(\d{2})(\d{2})/, '$1.$2') : ''); }, [propValue]);
  const handleChange = (e) => {
    const input = e.target.value; let digits = input.replace(/\D/g, '');
    if (digits.length > 4) { digits = digits.substring(0, 4); }
    let formatted = digits;
    if (digits.length > 2) { formatted = digits.substring(0, 2) + '.' + digits.substring(2); }
    setDisplayValue(formatted);
    if (rhfOnChange) { rhfOnChange({ target: { name, value: formatted } }); }
  };
  const handleBlur = (e) => { if (rhfOnBlur) { rhfOnBlur(e); } };
  return (
    <div className={inputStyles.label}>
      <label>{label}</label>
      <div className={inputStyles.inputWrapper}><input ref={ref} type="text" name={name} value={displayValue} onChange={handleChange} onBlur={handleBlur} placeholder="ss.SS" maxLength={5} {...rest} /></div>
      {error && <p>{error.message}</p>}
    </div>
  );
});

export const CompetitionResultCard = ({ competitionName, proofName, data }) => {
  const [times, setTimes] = useState(() => {
    const initialTimes = {};
    data.forEach(item => { initialTimes[item.partial.id] = item.partial.time || ''; });
    return initialTimes;
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const { control, trigger, formState: { errors }, setValue, watch } = useForm({ resolver: zodResolver(partialSchema), mode: 'onBlur' });
  const { patchPartials } = useContext(AppContext);

  const athletesGrouped = useMemo(() => {
    return data.reduce((acc, currentItem) => {
      const athleteName = currentItem.partial.athlete.name;
      if (!acc[athleteName]) { acc[athleteName] = []; }
      acc[athleteName].push(currentItem);
      return acc;
    }, {});
  }, [data]);

  const handleEditClick = (partialId) => {
    setEditingItemId(partialId);
    setValue('time', times[partialId]);
  };
  const handleSaveClick = async (partialId) => {
    const isValid = await trigger('time');
    if (isValid) {
      const newTime = watch('time');
      setTimes(prev => ({ ...prev, [partialId]: newTime }));
      setEditingItemId(null);
    }
  };
  const handleCancelEdit = () => { setEditingItemId(null); };
  const handleFinalSubmit = async () => {
    if (editingItemId) {
      const isValid = await trigger('time');
      if (!isValid) { toast.error('Corrija o tempo inválido antes de enviar.'); return; }
      times[editingItemId] = watch('time');
    }
    const payload = Object.keys(times).map(partialId => ({
      partialId: parseInt(partialId),
      time: parseFloat(String(times[partialId]).replace(",", ".")),
      frequency: null
    })).filter(item => !isNaN(item.time) && item.time > 0);
    
    if (payload.length > 0) {
      patchPartials({ partials: payload });
      toast.success('Tempos enviados com sucesso!');
    } else {
      toast.warn('Nenhum tempo válido para enviar.');
    }
  };

  return (
    <li className={styles.competitionCard}>
      <h1>{competitionName}</h1>
      <p>{proofName}</p>
      {Object.keys(athletesGrouped).map(athleteName => (
        <div key={athleteName} className={styles.athleteGroup}>
          <h2 className={styles.athleteName}>{athleteName}</h2>
          <div className={styles.partialsGrid}>
            {athletesGrouped[athleteName].map(item => {
              const partialId = item.partial.id;
              const isEditing = editingItemId === partialId;
              const currentTime = times[partialId];
              const meters = item.partial.partialNumber * 50;
              return (
                <div key={partialId} className={styles.partialItem}>
                  {isEditing ? (
                    <div className={styles.editForm}>
                      <Controller name="time" control={control} defaultValue={currentTime} render={({ field }) => ( <TimeInput {...field} label={`Parcial ${meters}m`} error={errors.time} /> )} />
                      <div className={styles.buttonGroup}>
                        <Button type="button" text="Salvar" onClick={() => handleSaveClick(partialId)} size="small" />
                        <Button type="button" text="Cancelar" onClick={handleCancelEdit} variant="secondary" size="small" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className={styles.partialMeters}>{meters}m</span>
                      <div className={styles.timeDisplay}>
                        <span>Tempo: {currentTime || "N/A"}</span>
                        <FaPen size={15} color='#64B5F6' onClick={() => handleEditClick(partialId)} style={{ cursor: 'pointer' }} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className={styles.submitSection}>
        <Button type="button" text="Enviar Tempos" onClick={handleFinalSubmit} size="large" />
      </div>
    </li>
  );
};
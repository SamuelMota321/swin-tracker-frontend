import { useState, useEffect, forwardRef, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { partialSchema } from '../../../schemas/partialSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaPen } from "react-icons/fa"
import { Button } from '../../Button'
import { AppContext } from '../../../providers/AppContext'
import styles from '../styles.module.scss'
import inputStyles from '../../Input/styles.module.scss' // Reutilizando estilos do Input

const TimeInput = forwardRef(({ label, name, error, onChange: rhfOnChange, onBlur: rhfOnBlur, value: propValue, ...rest }, ref) => {
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    // Formata o valor inicial que vem do estado
    setDisplayValue(propValue ? String(propValue).replace(/(\d{2})(\d{2})/, '$1.$2') : '');
  }, [propValue]);


  const handleChange = (e) => {
    const input = e.target.value
    let digits = input.replace(/\D/g, '')

    if (digits.length > 4) {
      digits = digits.substring(0, 4)
    }

    let formatted = digits;
    if (digits.length > 2) {
      formatted = digits.substring(0, 2) + '.' + digits.substring(2);
    }
    
    setDisplayValue(formatted)
    
    // Passa o valor formatado para o React Hook Form
    if (rhfOnChange) {
      rhfOnChange({ target: { name, value: formatted } });
    }
  }

  const handleBlur = (e) => {
    if (rhfOnBlur) {
        rhfOnBlur(e)
    }
  }

  return (
    <div className={inputStyles.label}>
      <label>{label}</label>
      <div className={inputStyles.inputWrapper}>
        <input
          ref={ref}
          type="text"
          name={name}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ss.SS"
          maxLength={5}
          {...rest}
        />
      </div>
      {error && <p>{error.message}</p>}
    </div>
  )
})

export const CompetitionCard = ({ competitionName, proofName, data }) => {
  const [times, setTimes] = useState(() => {
    const initialTimes = {}
    data.forEach(item => {
      initialTimes[item.partial.id] = item.partial.time || ''
    })
    return initialTimes
  })
  const [editingItemId, setEditingItemId] = useState(null)
  const { control, trigger, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(partialSchema),
    mode: 'onBlur',
  })
  const { patchPartials } = useContext(AppContext)

  const handleEditClick = (partialId) => {
    setEditingItemId(partialId)
    setValue('time', times[partialId])
  }

  const handleSaveClick = async (partialId) => {
    const isValid = await trigger('time')
    if (isValid) {
      const newTime = watch('time');
      setTimes(prev => ({...prev, [partialId]: newTime}))
      setEditingItemId(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingItemId(null)
  }

  const handleFinalSubmit = async () => {
    // Garante que a última edição seja salva no estado antes de enviar
    if (editingItemId) {
        const isValid = await trigger('time');
        if (!isValid) {
            alert('Por favor, corrija o tempo inválido antes de enviar.');
            return;
        }
        const lastEditedTime = watch('time');
        times[editingItemId] = lastEditedTime;
    }

    const payload = data.map(item => ({
      partialId: item.partial.id,
      time: parseFloat(String(times[item.partial.id]).replace(",", ".")),
      frequency: null 
    })).filter(item => !isNaN(item.time) && item.time > 0);
    
    if (payload.length > 0) {
        patchPartials({ partials: payload });
        alert('Tempos enviados com sucesso!');
    } else {
        alert('Nenhum tempo válido para enviar.');
    }
  }

  let lastAthleteName = ""
  let count = 0

  return (
    <li className={styles.competitionCard}>
      <h1>{competitionName}</h1>
      <p>{proofName}</p>
      <div className={styles.partialsList}>
        {data.map((item) => {
          const currentAthlete = item.partial.athlete.name
          if (currentAthlete !== lastAthleteName) {
            lastAthleteName = currentAthlete
            count = 1
          } else {
            count += 1
          }
          const labelValue = `${count * 50}` // Assumindo piscina de 50
          const partialId = item.partial.id
          const isEditing = editingItemId === partialId
          const currentTime = times[partialId] 

          return (
            <div key={partialId} className={styles.partialItem}>
              <h2>{currentAthlete}</h2>
              {isEditing ? (
                <div className={styles.editForm}>
                  <Controller
                    name="time"
                    control={control}
                    defaultValue={currentTime}
                    render={({ field }) => (
                      <TimeInput
                        {...field}
                        label={`Parcial ${labelValue}m`}
                        error={errors.time}
                      />
                    )}
                  />
                  <div className={styles.buttonGroup}>
                    <Button 
                      type="button" 
                      text="Salvar" 
                      onClick={() => handleSaveClick(partialId)} 
                      size="small"
                    />
                    <Button 
                      type="button" 
                      text="Cancelar" 
                      onClick={handleCancelEdit} 
                      variant="secondary" 
                      size="small"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.timeDisplay}>
                  <p>Tempo: {currentTime || "N/A"}</p>
                  <FaPen 
                    size={15} 
                    color='#64B5F6' 
                    onClick={() => handleEditClick(partialId)} 
                    style={{ cursor: 'pointer' }} 
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className={styles.submitSection}>
        <Button 
          type="button" 
          text="Enviar Tempos" 
          onClick={handleFinalSubmit}
          size="large"
        />
      </div>
    </li>
  )
}
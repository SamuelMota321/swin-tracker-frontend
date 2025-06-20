import { useState, useEffect, useRef, forwardRef, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { partialSchema } from '../../../schemas/partialSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaPen } from "react-icons/fa"
import { Button } from '../../Button'
import { AppContext } from '../../../providers/AppContext'
import styles from '../styles.module.scss'

const TimeInput = forwardRef(({ label, name, error, onChange: rhfOnChange, onBlur: rhfOnBlur, value: propValue, ...rest }, ref) => {
  const inputId = `input-${label}-${name || 'time'}` 
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    let initialFormatted = ''
    if (propValue) {
      const digits = String(propValue).replace(/\D/g, '')
      if (digits.length === 4) {
        initialFormatted = digits.substring(0, 2) + '.' + digits.substring(2)
      } else if (digits.length > 0) {
        initialFormatted = String(propValue)
      }
    }
    setDisplayValue(initialFormatted)
  }, [propValue])

  const handleChange = (e) => {
    const input = e.target.value

    let digits = input.replace(/\D/g, '')

    if (digits.length > 4) {
      digits = digits.substring(0, 4)
    }

    let formatted = ''
    if (digits.length >= 1) {
      formatted = digits.substring(0, 2)
    }
    if (digits.length >= 3) {
      formatted = formatted + '.' + digits.substring(2)
    }

    setDisplayValue(formatted)

    if (rhfOnChange) {
      const syntheticEvent = { target: { name: name, value: formatted } }
      rhfOnChange(syntheticEvent)
    }
  }

  const handleBlur = (e) => {
    let finalFormattedValue = displayValue
    const digits = displayValue.replace(/\D/g, '')

    if (digits.length > 0 && digits.length < 4) {
      const padded = digits.padEnd(4, '0')
      finalFormattedValue = padded.substring(0, 2) + '.' + padded.substring(2, 4)
    } else if (digits.length === 4) {
      finalFormattedValue = digits.substring(0, 2) + '.' + digits.substring(2, 4)
    } else if (digits.length === 0) {
      finalFormattedValue = ''
    }

    setDisplayValue(finalFormattedValue)
    if (rhfOnChange) {
      const syntheticEvent = { target: { name: name, value: finalFormattedValue } }
      rhfOnChange(syntheticEvent)
    }

    if (rhfOnBlur) {
      rhfOnBlur(e)
    }
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor={inputId} style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>{label}</label>
      <input
        ref={ref}
        type="text"
        id={inputId}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="ss.SS"
        maxLength={5}
        aria-invalid={error ? "true" : "false"}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid #DEE2E6',
          borderRadius: '12px',
          fontSize: '1rem',
          fontFamily: 'Inter, sans-serif',
          background: '#FFFFFF',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}
        {...rest}
      />
      {error && <span style={{ color: '#dc3545', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>{error.message}</span>}
    </div>
  )
})

export const CompetitionCard = ({ competitionName, proofName, data, onSubmitAll }) => {
  const [times, setTimes] = useState(() => {
    const initialTimes = {}
    data.forEach(item => {
      initialTimes[item.partial.id] = item.partial.time || ''
    })
    return initialTimes
  })
  const [editingItemId, setEditingItemId] = useState(null)
  const { control, trigger, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(partialSchema),
    mode: 'onBlur',
  })
  const { patchPartials } = useContext(AppContext)

  const handleTimeChange = async (partialId, value) => {
    setTimes(prevTimes => ({
      ...prevTimes,
      [partialId]: value
    }))

    setValue('time', value)
  }

  const handleEditClick = (partialId) => {
    setEditingItemId(partialId)
    setValue('time', times[partialId])
  }

  const handleSaveClick = async (partialId) => {
    const isValid = await trigger('time')
    if (isValid) {
      setEditingItemId(null)
    } else {
      console.log("Validation error for", partialId, errors.time?.message)
    }
  }

  const handleCancelEdit = () => {
    setEditingItemId(null)
  }

  const handleFinalSubmit = async () => {
    const payload = data.map(item => ({
      partialId: item.partial.id,
      time: parseTimeToNumber(times[item.partial.id]),
      frequency: null
    }))

    const validPayload = payload.filter(item => item.time !== undefined && item.time !== null && !isNaN(item.time))

    patchPartials(validPayload)
    console.log("Submitting payload:", validPayload)

    if (onSubmitAll) {
      onSubmitAll(validPayload)
    }
  }

  const parseTimeToNumber = (value) => {
    if (typeof value !== 'string' || value.trim() === '') return null
    const digits = value.replace(/\D/g, '')
    if (digits.length === 4) {
      const seconds = parseInt(digits.substring(0, 2), 10)
      const hundredths = parseInt(digits.substring(2, 4), 10)
      const num = parseFloat(`${seconds}.${hundredths}`)
      return isNaN(num) ? null : num
    }
    const num = parseFloat(value)
    return isNaN(num) ? null : num
  }

  let lastAthleteName = ""
  let count = 0

  return (
    <li className={styles.competitionCard}>
      <h1>{competitionName}</h1>
      <p>{proofName}</p>
      <div className={styles.partialsList}>
        {data.map((item, i) => {
          const currentAthlete = item.partial.athlete.name
          if (currentAthlete !== lastAthleteName) {
            lastAthleteName = currentAthlete
            count = 1
          } else {
            count += 1
          }
          const labelValue = `${count * 25}`
          const partialId = item.partial.id
          const isEditing = editingItemId === partialId
          const currentTime = times[partialId] 

          return (
            <div key={partialId || i} className={styles.partialItem}>
              <h2>{currentAthlete}</h2>
              {isEditing ? (
                <div className={styles.editForm}>
                  <Controller
                    name={`time_${partialId}`}
                    control={control}
                    defaultValue={currentTime}
                    render={({ field, fieldState }) => (
                      <TimeInput
                        value={currentTime}
                        onChange={(e) => handleTimeChange(partialId, e.target.value)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        label={`Parcial ${labelValue}m`}
                        error={editingItemId === partialId ? errors.time : null}
                      />
                    )}
                  />
                  <div className={styles.buttonGroup}>
                    <Button 
                      type="button" 
                      text="Salvar" 
                      onClick={() => {
                        handleFinalSubmit()
                        handleSaveClick(partialId)
                      }} 
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
                    color='#1976D2' 
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
          text="Enviar Todos os Tempos" 
          onClick={handleFinalSubmit}
          size="large"
        />
      </div>
    </li>
  )
}
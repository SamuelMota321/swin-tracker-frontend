import { forwardRef } from "react";
import styles from "./styles.module.scss";

export const Select = forwardRef(({ values, error, label, ...rest }, ref) => {
    return (
        <div className={styles.selectContainer}>
            {label && <label>{label}</label>}
            <select ref={ref} {...rest}>
                {values.map((value, i) => (
                    <option key={i} value={i !== 0 ? value : ""}>
                        {value}
                    </option>
                ))}
            </select>
            {error && <p className={styles.error}>{error.message}</p>}
        </div>
    )
})
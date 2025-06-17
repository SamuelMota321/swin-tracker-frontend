import { forwardRef } from "react";
import styles from "./styles.module.scss";

export const Select = forwardRef(({ values, error, label, ...rest }, ref) => {
    return (
        <div className={styles.selectContainer}>
            <label>{label}</label>
            <select ref={ref} {...rest}>
                {values.map((value, i) => {
                    return <option key={i} value={i != 0 ? value : null}>{value}</option>
                })}
            </select>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
})
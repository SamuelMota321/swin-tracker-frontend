import { forwardRef } from "react";

export const Select = forwardRef(({ values, ...rest }, ref) => {
    return (
        <div>
            <label>
                {rest.label}
            </label>
            <select ref={ref} {...rest}>
                {values.map((value, i) => {
                    return <option key={i} value={i != 0 ? value : null}>{value}</option>
                })}
            </select>
            {rest.error?.message}
        </div>
    )
})  
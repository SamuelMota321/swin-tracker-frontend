import { forwardRef, useState } from "react"
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

export const Input = forwardRef(({ label, error, search, ...rest }, ref) => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	return (
		<div className={styles.label}>
			{label && <label>{label}</label>}
			<div className={styles.inputWrapper}>
				<input
					ref={ref}
					{...rest}
					type={rest.type === "password" && passwordVisibility ? "text" : rest.type}
				/>
				{rest.type === "password" ? (
					passwordVisibility ? (
						<FaEye
							className={styles.icon}
							onClick={() => setPasswordVisibility(!passwordVisibility)}
							size={20}
						/>
					) : (
						<FaEyeSlash
							className={styles.icon}
							onClick={() => setPasswordVisibility(!passwordVisibility)}
							size={20}
						/>
					)
				) : null}
				{search && <FaSearch className={styles.icon} />}
			</div>
			{error && <p>{error.message}</p>}
		</div>
	)
})
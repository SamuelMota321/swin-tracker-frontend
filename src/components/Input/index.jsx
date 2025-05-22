import { forwardRef, useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FaSearch } from "react-icons/fa";



export const Input = forwardRef(({ ...rest }, ref) => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	return (
		<div className={rest.className}>
			<label className={styles.label} >
				{rest.label}
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
							size={21}
						/>
					) : (
						<FaEyeSlash
							className={styles.icon}
							onClick={() => setPasswordVisibility(!passwordVisibility)}
							size={21}
						/>
					)
				) : null}
				{rest.search ? <FaSearch className={styles.icon} /> : <></>}
				<p>{rest.error?.message}</p>
			</label>
		</div>
	)
})
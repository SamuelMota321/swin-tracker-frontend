import styles from './styles.module.scss'

export const Button = ({ text, onClick, type, variant = 'primary', size = 'medium', className, ...props }) => {
    const getButtonClasses = () => {
        let classes = [styles.button]
        
        if (variant === 'secondary') classes.push(styles.secondary)
        if (size === 'small') classes.push(styles.small)
        if (size === 'large') classes.push(styles.large)
        if (className) classes.push(className)
        
        return classes.join(' ')
    }

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={getButtonClasses()}
            {...props}
        >
            {text}
        </button>
    )
}
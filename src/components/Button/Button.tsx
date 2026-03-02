import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'teal' | 'cyan' | 'lime' | 'game' | 'inverted'
  fullWidth?: boolean
}

export function Button({ variant = 'teal', fullWidth = false, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

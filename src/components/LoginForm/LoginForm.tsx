import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { Button } from '../Button/Button'
import { Routes } from '../../utils'
import type { LoginFormValues } from '../../types'
import { Images } from '../../utils'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>()

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError('')
    const success = await login(data.email, data.password)
    if (success) {
      navigate(Routes.Home)
    } else {
      setAuthError('Correo o contraseña incorrectos')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <img src={Images.Logo} alt="Rick and Morty" className={styles.logo} />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Usuario</label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder=""
          {...register('email', { required: 'El correo es requerido' })}
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Contraseña</label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder=""
            {...register('password', { required: 'La contraseña es requerida' })}
          />
          <button
            type="button"
            className={styles.eyeToggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
      </div>

      {authError && <p className={styles.authError}>{authError}</p>}

      <Button type="submit" variant="teal" fullWidth disabled={isSubmitting}>
        Iniciar sesión
      </Button>

      <a href="#" className={styles.forgotLink}>
        ¿Olvidaste tu usuario o contraseña?
      </a>
    </form>
  )
}

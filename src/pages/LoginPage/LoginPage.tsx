import { LoginForm } from '../../components/LoginForm/LoginForm'
import styles from './LoginPage.module.css'

export function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <LoginForm />
      </div>
    </main>
  )
}

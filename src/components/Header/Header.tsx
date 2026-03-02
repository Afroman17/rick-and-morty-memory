import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo1.png" alt="Rick and Morty" className={styles.logo} />
      <span className={styles.badge}>Juego de memoria</span>
    </header>
  )
}

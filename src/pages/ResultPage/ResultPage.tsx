import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Button } from '../../components/Button/Button'
import { Routes } from '../../utils'
import styles from './ResultPage.module.css'

export function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const turns = location.state?.turns ?? 0

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>¡Felicitaciones!</h1>
          <p className={styles.subtitle}>Terminaste el juego con {turns} turnos</p>
          <div className={styles.actions}>
            <Button variant="game" onClick={() => navigate(Routes.Game)} className={styles.button}>
              Repetir
            </Button>
            <Button variant="inverted" onClick={() => navigate(Routes.Home)} className={styles.button}>
              Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

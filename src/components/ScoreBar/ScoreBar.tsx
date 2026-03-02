import styles from './ScoreBar.module.css'

interface ScoreBarProps {
  score: number
  turns: number
}

export function ScoreBar({ score, turns }: ScoreBarProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.item}>Aciertos: {score}</span>
      <span className={styles.item}>Turnos: {turns}</span>
    </div>
  )
}

import type { Character } from '../../types'
import styles from './CharacterCard.module.css'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.name}>{character.name}</p>
        <p className={styles.meta}>{character.status} · {character.species}</p>
      </div>
    </div>
  )
}

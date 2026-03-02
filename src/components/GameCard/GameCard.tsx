import type { CardItem } from '../../types'
import { Images } from '../../utils'
import styles from './GameCard.module.css'

interface GameCardProps {
  card: CardItem
  onClick: (id: string) => void
}

export function GameCard({ card, onClick }: GameCardProps) {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card.id)
    }
  }

  return (
    <div
      className={`${styles.cardOuter} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.back}>
          <img src={Images.CardBack} alt="card back" className={styles.backImage} />
        </div>
        <div className={styles.front}>
          <img src={card.image} alt={card.name} className={styles.frontImage} />
        </div>
      </div>
    </div>
  )
}

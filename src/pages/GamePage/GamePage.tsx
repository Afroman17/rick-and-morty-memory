import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../../api/characters'
import { useGameLogic } from '../../hooks/useGameLogic'
import { Header } from '../../components/Header/Header'
import { ScoreBar } from '../../components/ScoreBar/ScoreBar'
import { GameCard } from '../../components/GameCard/GameCard'
import type { Character } from '../../types'
import styles from './GamePage.module.css'

export function GamePage() {
  const location = useLocation()
  const passedCharacters: Character[] | undefined = location.state?.characters
  const gameId = useRef(Date.now())

  const { data: fetchedCharacters, isLoading } = useQuery({
    queryKey: ['characters', gameId.current],
    queryFn: fetchCharacters,
    staleTime: 0,
    enabled: !passedCharacters,
  })

  const characters = passedCharacters ?? fetchedCharacters
  const { cards, turns, score, handleCardClick } = useGameLogic(characters)

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        {isLoading && !passedCharacters ? (
          <div className={styles.loadingWrapper}>
            <p className={styles.loadingText}>Cargando personajes...</p>
          </div>
        ) : (
          <>
            <ScoreBar score={score} turns={turns} />
            <div className={styles.grid}>
              {cards.map((card) => (
                <GameCard key={card.id} card={card} onClick={handleCardClick} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

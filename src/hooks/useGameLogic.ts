import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Character, CardItem, GamePhase } from '../types'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildCards(characters: Character[]): CardItem[] {
  const pairs = characters.flatMap((char) => [
    { id: `${char.id}-0`, characterId: char.id, name: char.name, image: char.image, isFlipped: true, isMatched: false },
    { id: `${char.id}-1`, characterId: char.id, name: char.name, image: char.image, isFlipped: true, isMatched: false },
  ])
  return shuffleArray(pairs)
}

export function useGameLogic(characters: Character[] | undefined) {
  const navigate = useNavigate()
  const [cards, setCards] = useState<CardItem[]>([])
  const [phase, setPhase] = useState<GamePhase>('preview')
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(0)
  const isProcessing = useRef(false)
  const totalPairs = useRef(0)

  useEffect(() => {
    if (!characters) return
    totalPairs.current = characters.length
    const initial = buildCards(characters)
    setCards(initial)
    setPhase('preview')
    setTurns(0)
    setScore(0)
    isProcessing.current = false

    const timer = setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, isFlipped: false })))
      setPhase('playing')
    }, 3000)

    return () => clearTimeout(timer)
  }, [characters])

  useEffect(() => {
    if (score > 0 && score === totalPairs.current) {
      setPhase('finished')
      setTimeout(() => {
        navigate('/result', { state: { turns } })
      }, 500)
    }
  }, [score, navigate, turns])

  const handleCardClick = (id: string) => {
    if (phase !== 'playing' || isProcessing.current) return

    const flipped = cards.filter((c) => c.isFlipped && !c.isMatched)
    const card = cards.find((c) => c.id === id)

    if (!card || card.isFlipped || card.isMatched || flipped.length >= 2) return

    const updatedCards = cards.map((c) => c.id === id ? { ...c, isFlipped: true } : c)
    setCards(updatedCards)

    const newFlipped = updatedCards.filter((c) => c.isFlipped && !c.isMatched)

    if (newFlipped.length === 2) {
      isProcessing.current = true
      const [a, b] = newFlipped

      if (a.characterId === b.characterId) {
        setTimeout(() => {
          setCards((curr) =>
            curr.map((c) =>
              c.characterId === a.characterId ? { ...c, isMatched: true, isFlipped: false } : c
            )
          )
          setScore((s) => s + 1)
          setTurns((t) => t + 1)
          isProcessing.current = false
        }, 1000)
      } else {
        setTimeout(() => {
          setCards((curr) =>
            curr.map((c) =>
              c.id === a.id || c.id === b.id ? { ...c, isFlipped: false } : c
            )
          )
          setTurns((t) => t + 1)
          isProcessing.current = false
        }, 1000)
      }
    }
  }

  return { cards, phase, turns, score, handleCardClick }
}

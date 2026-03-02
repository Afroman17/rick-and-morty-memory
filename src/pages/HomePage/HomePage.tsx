import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchCharacters } from '../../api/characters'
import { Header } from '../../components/Header/Header'
import { CharacterCard } from '../../components/CharacterCard/CharacterCard'
import { Button } from '../../components/Button/Button'
import styles from './HomePage.module.css'

export function HomePage() {
  const navigate = useNavigate()

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    gcTime: 0,
  })

  const duplicatedCharacters = characters
    ? characters.flatMap((c) => [c, c])
    : []

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner} />
            <p className={styles.message}>Cargando personajes...</p>
          </div>
        )}
        {isError && <p className={styles.message}>Error al cargar los personajes.</p>}

        {characters && (
          <>
            <h2 className={styles.title}>Personajes</h2>
            <div className={styles.grid}>
              {duplicatedCharacters.map((character, index) => (
                <CharacterCard key={`${character.id}-${index}`} character={character} />
              ))}
            </div>
          </>
        )}

        {characters && (
          <div className={styles.footer}>
            <Button variant="game" onClick={() => navigate('/game', { state: { characters } })} className={styles.button}>
              Jugar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

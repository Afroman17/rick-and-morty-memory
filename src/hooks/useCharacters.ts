import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../api/characters'
import { QueryKeys } from '../utils'

interface UseCharactersOptions {
  gameId?: number
  enabled?: boolean
}

export function useCharacters({ gameId, enabled = true }: UseCharactersOptions = {}) {
  return useQuery({
    queryKey: gameId ? [QueryKeys.Characters, gameId] : [QueryKeys.Characters],
    queryFn: fetchCharacters,
    staleTime: gameId ? 0 : undefined,
    gcTime: gameId ? undefined : 0,
    enabled,
  })
}

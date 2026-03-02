import { apiClient } from './client'
import type { Character } from '../types'

const TOTAL_CHARACTERS = 826
const CARDS_COUNT = 6

function getRandomIds(count: number, max: number): number[] {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1)
  }
  return Array.from(ids)
}

export async function fetchCharacters(): Promise<Character[]> {
  const ids = getRandomIds(CARDS_COUNT, TOTAL_CHARACTERS)
  const { data } = await apiClient.get<Character[]>(`/character/${ids.join(',')}`)
  return data
}

import { useContext } from 'react'
import { CardsContext } from '../contexts/cardContext'

export function useCards() {
  return useContext(CardsContext)
}

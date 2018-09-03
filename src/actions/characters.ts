import { StarWarsConnection, Character } from '../sagas/characters'

export const getCharacters = () => ({
  type: 'CHARACTERS_FETCH',
})

export const charactersFetchError = (error: string) => ({
  type: 'CHARACTERS_FETCH_FAIL',
  error,
})

export const receiveHelloWorld = (characters: StarWarsConnection<Character>) => ({
  type: 'CHARACTERS_FETCH_SUCCESS',
  characters,
})

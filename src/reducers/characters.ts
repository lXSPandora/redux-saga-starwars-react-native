import { StarWarsConnection, Character } from '../sagas/characters'

export interface CharactersState {
  isFetching: boolean,
  error: string | null,
  characters: StarWarsConnection<Character> | null,
}

const initialState = {
  isFetching: false,
  error: null,
  characters: null,
};

const characters = (state: CharactersState = initialState, action) => {
  switch (action.type) {
    case 'CHARACTERS_FETCH_REQUESTED':
      return {
        ...state,
        isFetching: true
      };
    case 'CHARACTERS_FETCH_FAIL':
      const { error } = action;
      return {
        ...state,
        error,
        isFetching: false,
      }
    case 'CHARACTERS_FETCH_SUCCESS':
      const { characters } = action 
      return {
        characters,
        isFetching: false,
      }
    default:
      return {
        ...initialState
      }
  }
};

export default characters;
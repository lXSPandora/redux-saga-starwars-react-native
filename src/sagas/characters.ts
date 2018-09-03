import { put, takeLatest } from 'redux-saga/effects';

export interface StarWarsConnection<T> {
  count: number,
  next: string,
  previous: string,
  results: Array<T>
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: string;
  edited: string;
  url: string;
}

function* fetchAllCharacters() {
  try {
    const req = yield fetch('https://swapi.co/api/people/');
    const characters = yield req.json();
    yield put({ type: "CHARACTERS_FETCH_SUCCESS", characters })
  } catch (e) {
    yield put({ type: "CHARACTERS_FETCH_FAIL", error: 'Something wrong happened' })
  }
}

function* characters() {
  yield takeLatest("CHARACTERS_FETCH", fetchAllCharacters);
}

export default characters;
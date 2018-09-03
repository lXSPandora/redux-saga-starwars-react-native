import { fork } from 'redux-saga/effects'

import characters from './characters'

export default function* root() {
  yield fork(characters);
};
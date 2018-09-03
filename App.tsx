import React, { PureComponent } from 'react'
import { Router } from "./src/config/Router";
import { Provider } from 'react-redux';

import store from './src/config/Store';

export interface Props {}

export default class App extends PureComponent<Props> {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
};
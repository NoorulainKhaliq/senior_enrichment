'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import Header from './components/Header'
import Main from './components/Main'

render (
  <Provider store={store}>
   <Main />
  </Provider>,
  document.getElementById('main')
)
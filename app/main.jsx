'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import Header from './components/Header'

render (
  <Provider store={store}>
   <Header />
  </Provider>,
  document.getElementById('main')
)



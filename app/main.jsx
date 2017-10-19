'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Main from './components/Main'
import AddStudForm from './components/AddStudForm'
import { BrowserRouter as Router } from 'react-router-dom'

render (
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('main')
)
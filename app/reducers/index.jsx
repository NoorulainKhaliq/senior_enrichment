/**

{
  students: {
    byId: {}
    selectedStudent: 0
  }
  campuses: {
    byId: {}
    selectedCampus: 0
  }
}

 */

import { combineReducers } from 'redux'

const initialState = {}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};

export default rootReducer

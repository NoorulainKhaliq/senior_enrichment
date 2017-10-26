import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import axios from 'axios';
// https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

//INITIAL STATE

const initialState = {
    campuses: []
}

//ACTION TYPES

const GET_CAMPUSES = "GET_CAMPUSES";

//ACTION CREATER 

export function getCampuses(campuses) {
    action = { type: GET_CAMPUSES, campuses: campuses };
    return action
}


//THUNK CREATORS

export function fetchCampuses(campuses) {
    return function thunk(dispatch) {
        axios.get(`/api/campus`)
            .then(res => res.data)
            .then(allCampuses => {
                const action = getCampuses(allCampuses)
                dispatch(action)
            })
    }
}

//REDUCER

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return {
                campuses: [...state.campuses, action.campuses]
            }
    }
}


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))

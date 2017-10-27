import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import axios from 'axios';
// https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

//INITIAL STATE

const initialState = {
    campuses: [],
    campus: {},
    students: []
}

//ACTION TYPES

const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUS = "GET_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const ADD_CAMPUS = "ADD_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS"

//ACTION CREATER 

export function getCampuses(campuses) {
    return { type: GET_CAMPUSES, campuses }
}
export function getStudents(students) {
    return { type: GET_STUDENTS, students }
}
export function getCampus(campus) {
    return { type: GET_CAMPUS, campus }
}
export function deleteCampus(campusId) {
    return { type: DELETE_CAMPUS, campusId }
}
export function addCampus(campus) {
    return { type: ADD_CAMPUS, campuses: campus }
}



//THUNK CREATORS

export function fetchCampuses() {
    return function thunk(dispatch) {
        axios.get(`/api/campus`)
            .then(res => res.data)
            .then(allCampuses => {
                const getCampusesAction = getCampuses(allCampuses)
                dispatch(getCampusesAction)
            })
    }
}

export function fetchCampus(campusId) {
    return function thunk(dispatch) {
        axios.get(`/api/campus/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                const getCampusAction = getCampus(campus)
                dispatch(getCampusAction)
            })
    }
}

export function fetchStudents() {
    return function thunk(dispatch) {
        axios.get('/api/student')
            .then(res => res.data)
            .then(students => {
                const getStudentAction = getStudents(students)
                dispatch(getStudentAction)
            })
    }
}

export function destroyCampus(campusId) {
    return function thunk(dispatch) {
        axios.delete(`/api/campus/${campusId}`)
            .then(res => res.data)
            .then(deletedCampusId => {
                const deleteCampusAction = deleteCampus(deletedCampusId)
                dispatch(deleteCampusAction)
            })
    }
}

export function createCampus(campusToCreate) {
    return function thunk(dispatch) {
        axios.post('api/campus', campusToCreate)
            .then(res => res.data)
            .then(newCampus => {
                const addCampusAction = addCampus(newCampus)
                dispatch(addCampusAction)
            })
    }
}

export function updateCampus(id, content) {
    return function thunk(dispatch) {
        axios.put(`/api/campus/${id}`, content)
            .then(updatedCampus => {
                const getCampusAction = getCampus(updatedCampus)
                dispatch(getCampusAction)
            })
    }
}



//REDUCER

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses })
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students })
        case GET_CAMPUS:
            return Object.assign({}, state, { campus: action.campus })
        case ADD_CAMPUS:
            return Object.assign({}, state, { campuses: [...state.campuses, action.campuses] })
        default: return state;
    }
}


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))






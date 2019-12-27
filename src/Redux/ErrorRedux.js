import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SET_ERROR: 'SET_ERROR',
  RESET_ERROR: 'RESET_ERROR'
}

const initialState = {
  errorDescription: ''
}

export const setError = (state = initialState, action) => (
  { type: TYPES.SET_ERROR, ...state, errorDescription: action.payload }
)
export const resetError = (state = initialState) => (
  { type: TYPES.SET_ERROR, ...state, errorDescription: '' }
)

const errorReducer = createReducer(initialState, {
  SET_ERROR: setError,
  RESET_ERROR: resetError
})

export const reducers = combineReducers({
  errorReducer
})

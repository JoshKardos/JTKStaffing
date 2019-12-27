import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SIGN_UP: 'SIGN_UP',
  LOG_OUT: 'LOG_OUT',
  FETCH_USER_DATA: 'FETCH_USER_DATA',
  SET_USER_DATA: 'SET_USER_DATA',
  START_SIGN_UP_LOADING: 'START_SIGN_UP_LOADING',
  STOP_SIGN_UP_LOADING: 'STOP_SIGN_UP_LOADING',
  SET_SIGN_UP_ERROR: 'SET_SIGN_UP_ERROR'
}

const initialState = {
  id: '',
  name: '',
  company: '',
  email: '',
  signUpLoading: false
}

export const logOut = () => (
  { type: TYPES.LOG_OUT, id: '', name: '', company: '', email: '', signUpLoading: false }
)

export const setSignUpError = (state = initialState) => (
  { type: TYPES.SET_SIGN_UP_ERROR, ...state }
)

export const stopSignUpLoading = (state = initialState) => (
  { type: TYPES.STOP_SIGN_UP_LOADING, ...state, signUpLoading: false }
)

export const startSignUpLoading = (state = initialState) => (
  { type: TYPES.START_SIGN_UP_LOADING, ...state, signUpLoading: true }
)

export const fetchUserData = (state = initialState) => (
  { type: TYPES.FETCH_USER_DATA, ...state }
)

export const setUserData = (state = initialState, action) => (
  { type: TYPES.SET_USER_DATA, ...state, ...action.payload }
)

export const signUp = (name, email, password, company) => (
  { type: TYPES.SIGN_UP, payload: { name, email, password, company } }
)

export const userLoggedIn = (state) => !(!state.id || !state.name || !state.company || !state.email)

const userReducer = createReducer(initialState, {
  LOG_OUT: logOut,
  FETCH_USER_DATA: fetchUserData,
  SET_USER_DATA: setUserData,
  SIGN_UP: signUp,
  START_SIGN_UP_LOADING: startSignUpLoading,
  STOP_SIGN_UP_LOADING: stopSignUpLoading,
  SET_SIGN_UP_ERROR: setSignUpError
})

export const reducers = combineReducers({
  userReducer
})

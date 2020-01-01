import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SIGN_UP: 'SIGN_UP',
  LOGIN: 'LOGIN',
  LOG_OUT: 'LOG_OUT',
  FETCH_USER_DATA: 'FETCH_USER_DATA',
  SET_USER_DATA: 'SET_USER_DATA',
  START_SIGN_UP_LOADING: 'START_SIGN_UP_LOADING',
  STOP_SIGN_UP_LOADING: 'STOP_SIGN_UP_LOADING',
  SET_SIGN_UP_ERROR: 'SET_SIGN_UP_ERROR',
  START_LOGIN_LOADING: 'START_LOGIN_LOADING',
  STOP_LOGIN_LOADING: 'STOP_LOGIN_LOADING',
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
}

const initialState = {
  id: '',
  name: '',
  company: '',
  email: '',
  signUpLoading: false,
  loginLoading: false,
  admin: false
}

export const logOut = () => (
  { type: TYPES.LOG_OUT, id: '', name: '', company: '', email: '', signUpLoading: false, loginLoading: false, admin: false }
)

export const login = (state = initialState) => (
  { type: TYPES.LOGIN, ...state }
)

export const setLoginError = (state = initialState) => (
  { type: TYPES.SET_SIGN_UP_ERROR, ...state }
)

export const stopLoginLoading = (state = initialState) => (
  { type: TYPES.STOP_SIGN_UP_LOADING, ...state, loginLoading: false }
)

export const startLoginLoading = (state = initialState) => (
  { type: TYPES.START_SIGN_UP_LOADING, ...state, loginLoading: true }
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

export const signUp = (state = initialState) => (
  { type: TYPES.SIGN_UP, ...state }
)

export const userLoggedIn = (state) => !(!state.id || !state.name || !state.company || !state.email)

export const adminLoggedIn = (state) => userLoggedIn && state.admin === true

const userReducer = createReducer(initialState, {
  LOG_OUT: logOut,
  LOGIN: login,
  FETCH_USER_DATA: fetchUserData,
  SET_USER_DATA: setUserData,
  SIGN_UP: signUp,
  START_SIGN_UP_LOADING: startSignUpLoading,
  STOP_SIGN_UP_LOADING: stopSignUpLoading,
  SET_SIGN_UP_ERROR: setSignUpError,
  SET_LOGIN_ERROR: setLoginError,
  START_LOGIN_LOADING: startLoginLoading,
  STOP_LOGIN_LOADING: stopLoginLoading
})

export const reducers = combineReducers({
  userReducer
})

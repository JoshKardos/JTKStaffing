import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SIGN_UP: 'SIGN_UP',
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

export const setSignUpError = (state = initialState) => {
  console.log('in reducer')
  return { type: TYPES.SET_SIGN_UP_ERROR, ...state }
}

export const stopSignUpLoading = (state = initialState) => (
  { type: TYPES.STOP_SIGN_UP_LOADING, ...state, signUpLoading: false }
)

export const startSignUpLoading = (state = initialState) => (
  { type: TYPES.START_SIGN_UP_LOADING, ...state, signUpLoading: true }
)
// const createUserStateObject = (obj) => {

// }

// export const setUserData = (state = initialState, action) => (
//   { type: TYPES.SET_USER_DATA, ...state, ...createUserStateObject(action.data) }
// )

export const signUp = (name, email, password, company) => (
  { type: TYPES.SIGN_UP, payload: { name, email, password, company } }
)

const userReducer = createReducer(initialState, {
  SIGN_UP: signUp,
  START_SIGN_UP_LOADING: startSignUpLoading,
  STOP_SIGN_UP_LOADING: stopSignUpLoading,
  SET_SIGN_UP_ERROR: setSignUpError
})

export const reducers = combineReducers({
  userReducer
})

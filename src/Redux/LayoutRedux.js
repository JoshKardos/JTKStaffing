import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SET_HOME_LAYOUT: 'SET_HOME_LAYOUT',
  SET_LOG_IN_LAYOUT: 'SET_LOG_IN_LAYOUT',
  SET_SIGN_UP_LAYOUT: 'SET_SIGN_UP_LAYOUT'
}

export const LAYOUTS = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP'
}

const initialState = {
  currentLayout: LAYOUTS.HOME
}

export const setHomeLayout = (state = initialState) => (
  { type: TYPES.SET_HOME_LAYOUT, ...state, currentLayout: LAYOUTS.HOME }
)

export const setSignUpLayout = (state = initialState) => (
  { type: TYPES.SET_SIGN_UP_LAYOUT, ...state, currentLayout: LAYOUTS.SIGNUP }
)

export const setLogInLayout = (state = initialState) => (
  { type: TYPES.SET_LOG_IN_LAYOUT, ...state, currentLayout: LAYOUTS.LOGIN }
)

const layoutReducer = createReducer(initialState, {
  SET_HOME_LAYOUT: setHomeLayout,
  SET_LOG_IN_LAYOUT: setLogInLayout,
  SET_SIGN_UP_LAYOUT: setSignUpLayout
})

export const reducers = combineReducers({
  layoutReducer
})

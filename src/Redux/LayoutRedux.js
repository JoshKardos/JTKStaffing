import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SET_HOME_LAYOUT: 'SET_HOME_LAYOUT'
}

const initialState = {
  currentLayout: 'HOME'
}

export const setHomeLayout = (state = initialState) => (
  { type: TYPES.SET_HOME_LAYOUT, ...state, currentLayout: 'HOME' }
)

const layoutReducer = createReducer(initialState, {
  SET_HOME_LAYOUT: setHomeLayout
})

export const reducers = combineReducers({
  layoutReducer
})

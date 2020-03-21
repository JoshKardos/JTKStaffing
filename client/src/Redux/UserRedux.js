import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SIGN_UP_WORKER: 'SIGN_UP_WORKER',
  FETCH_ADMIN_WORKERS: 'FETCH_ADMIN_WORKERS',
  SIGN_UP_ADMIN: 'SIGN_UP_ADMIN',
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
  EDIT_NAME: 'EDIT_NAME'
}

const initialState = {
  id: '',
  name: '',
  company: '',
  email: '',
  signUpLoading: false,
  loginLoading: false,
  admin: false,
  adminId: '',
  timesheets: [],
  /* TIMESHEET STRUCTURE
    filepath: "timesheets/AzDGOd6DZeMuue5Ozm5waQ3Nrju2/1579564015132.xlsx"
    id: "1579564015132"
    timesheetTimePeriod: "January 26, 2020 – February 1, 2020"
    timestamp: "1579564015132"
    userId
  */
  employees: []
  /*
    company:
    email:
    uid:
    name:
  */
}

export const logOut = () => (
  { type: TYPES.LOG_OUT, id: '', name: '', company: '', email: '', signUpLoading: false, loginLoading: false, admin: false, timesheets: [], employees: [], adminId: '' }
)

export const editName = (state = initialState) => (
  { type: TYPES.EDIT_NAME, ...state }
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

export const signUpAdmin = (state = initialState) => (
  { type: TYPES.SIGN_UP_ADMIN, ...state }
)

export const signUpWorker = (state = initialState) => (
  { type: TYPES.SIGN_UP_WORKER, ...state }
)

export const userLoggedIn = (state) => !(!state.id || !state.name || !state.company || !state.email)

export const adminLoggedIn = (state) => userLoggedIn && state.admin === true

const userReducer = createReducer(initialState, {
  LOG_OUT: logOut,
  LOGIN: login,
  FETCH_USER_DATA: fetchUserData,
  SET_USER_DATA: setUserData,
  SIGN_UP_ADMIN: signUpAdmin,
  SIGN_UP_WORKER: signUpWorker,
  START_SIGN_UP_LOADING: startSignUpLoading,
  STOP_SIGN_UP_LOADING: stopSignUpLoading,
  SET_SIGN_UP_ERROR: setSignUpError,
  SET_LOGIN_ERROR: setLoginError,
  START_LOGIN_LOADING: startLoginLoading,
  STOP_LOGIN_LOADING: stopLoginLoading,
  EDIT_NAME: editName
})

export const reducers = combineReducers({
  userReducer
})

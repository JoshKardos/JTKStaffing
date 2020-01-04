import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  SET_TIMESHEET_FILE_ERROR: 'SET_TIMESHEET_FILE_ERROR'
}

const initialState = {
  timesheetFile: null
}

export const setTimesheetFileError = (state = initialState) => (
  { type: TYPES.SET_TIMESHEET_FILE_ERROR, ...state }
)

const dashboardReducer = createReducer(initialState, {
  SET_TIMESHEET_FILE_ERROR: setTimesheetFileError
})

export const reducers = combineReducers({
  dashboardReducer
})

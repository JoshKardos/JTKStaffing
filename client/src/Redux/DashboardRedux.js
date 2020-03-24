import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer';

export const TYPES = {
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  SAVE_TO_DATABASE: 'SAVE_TO_DATABASE',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  SET_TIMESHEET_FILE_ERROR: 'SET_TIMESHEET_FILE_ERROR',
  UPLOAD_TIMESHEET: 'UPLOAD_TIMESHEET',
  TIMESHEET_UPLOAD_START: 'TIMESHEET_UPLOAD_START',
  TIMESHEET_UPLOAD_STOP: 'TIMESHEET_UPLOAD_STOP',
  EDITTING_SETTINGS_START: 'EDITTING_SETTINGS_START',
  SET_EDITTING_SETTINGS: 'SET_EDITTING_SETTINGS',
  EDITTING_SETTINGS_STOP: 'EDITTING_SETTINGS_STOP'
}

const initialState = {
  uploadError: '',
  uploading: false,

  // SETTINGS
  edittingSettings: ''
}

export const startEdittingSettings = (state = initialState) => (
  { type: TYPES.EDITTING_SETTINGS_START, ...state }
)

export const setEdittingSettings = (state = initialState, action) => {
  console.log(action)
  return { type: TYPES.SET_EDITTING_SETTINGS, ...state, edittingSettings: action.payload }

}

export const stopEdittingSettings = (state = initialState) => (
  { type: TYPES.EDITTING_SETTINGS_STOP, ...state }
)

export const saveToDatabase = (state = initialState) => (
  { type: TYPES.SAVE_TO_DATABASE, ...state }
)

export const timesheetUploadError = (state = initialState) => (
  { type: TYPES.UPLOAD_ERROR, ...state }
)

export const timesheetUploadSuccess = (state = initialState) => (
  { type: TYPES.UPLOAD_SUCCESS, ...state }
)

export const timesheetUploadStop = (state = initialState) => (
  { type: TYPES.TIMESHEET_UPLOAD_STOP, ...state, uploading: false }
)

export const timesheetUploadStart = (state = initialState) => (
  { type: TYPES.TIMESHEET_UPLOAD_START, ...state, uploading: true }
)

export const uploadTimesheet = (state = initialState) => (
  { type: TYPES.UPLOAD_TIMESHEET, ...state }
)

export const setTimesheetFileError = (state = initialState) => (
  { type: TYPES.SET_TIMESHEET_FILE_ERROR, ...state }
)

const dashboardReducer = createReducer(initialState, {
  SAVE_TO_DATABASE: saveToDatabase,
  UPLOAD_ERROR: timesheetUploadError,
  UPLOAD_SUCCESS: timesheetUploadSuccess,
  TIMESHEET_UPLOAD_START: timesheetUploadStart,
  TIMESHEET_UPLOAD_STOP: timesheetUploadStop,
  UPLOAD_TIMESHEET: uploadTimesheet,
  SET_TIMESHEET_FILE_ERROR: setTimesheetFileError,
  EDITTING_SETTINGS_START: startEdittingSettings,
  EDITTING_SETTINGS_STOP: stopEdittingSettings,
  SET_EDITTING_SETTINGS: setEdittingSettings
})

export const reducers = combineReducers({
  dashboardReducer
})

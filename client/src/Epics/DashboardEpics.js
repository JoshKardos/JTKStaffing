import { ofType } from 'redux-observable'
import axios from 'axios'
import { map, mapTo, switchMap } from 'rxjs/operators';
import { TYPES as DashboardTypes } from '../Redux/DashboardRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import firebase from '../Firebase/index'

export const uploadErrorEpic = (action$) => action$.pipe(
  ofType(DashboardTypes.UPLOAD_ERROR),
  mapTo({ type: ErrorTypes.SET_ERROR, payload: 'Error saving to our records, try again...' })
)

export const setEdittingSettingsEpic = (action$) => action$.pipe(
  ofType(DashboardTypes.EDITTING_SETTINGS_START, DashboardTypes.EDITTING_SETTINGS_STOP),
  map(action => {
    const header = action.payload
    return { type: DashboardTypes.SET_EDITTING_SETTINGS, payload: header }
  })
)

export const saveToDatabase = (action$) => action$.pipe(
  ofType(DashboardTypes.SAVE_TO_DATABASE),
  map(action => {
    const { filepath, id, timestamp, userId, timesheetTimePeriod, downloadUrl } = action
    // get timesheet id, user id, timestamp
    const userTimesheetRef = firebase.database().ref(`/user-timesheets/${userId}/${id}/`)
    userTimesheetRef.set({
      timesheetTimePeriod,
      filepath,
      id,
      userId,
      timestamp,
      downloadUrl
    })
    return { type: DashboardTypes.UPLOAD_SUCCESS, payload: downloadUrl }
  })
)

export const sendEmailEpic = (action$, state$) => action$.pipe(
  ofType(DashboardTypes.UPLOAD_SUCCESS),
  switchMap(action => {
    const { name, adminId } = state$.value.UserReducers.userReducer
    const downloadUrl = action.payload
    return firebase.database().ref(`/users/${adminId}`).once('value').then(adminSnapshot => {
      axios.post('/api/form', {
        adminEmail: adminSnapshot.val()['email'],
        senderName: name,
        downloadUrl
      })
      return { type: '' }
    })
  })
)

export const uploadCompleteEpic = (action$) => action$.pipe(
  ofType(DashboardTypes.UPLOAD_SUCCESS, DashboardTypes.UPLOAD_ERROR),
  mapTo({ type: DashboardTypes.TIMESHEET_UPLOAD_STOP })
)

export const showUploadSuccessEpic = (action$) => action$.pipe(
  ofType(DashboardTypes.UPLOAD_SUCCESS),
  mapTo({ type: ErrorTypes.SET_ERROR, payload: 'Successfully uploaded your timesheet' })
)

export const setTimesheetFileError = (action$) => action$.pipe(
  ofType(DashboardTypes.SET_TIMESHEET_FILE_ERROR),
  map((action) => ({ type: ErrorTypes.SET_ERROR, payload: action.payload }))
)

export default null

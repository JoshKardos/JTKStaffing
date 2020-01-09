import { ofType } from 'redux-observable'
import { map, mapTo } from 'rxjs/operators';
import { TYPES as DashboardTypes } from '../Redux/DashboardRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import firebase from '../Firebase/index'

export const uploadErrorEpic = (action$) => action$.pipe(
  ofType(DashboardTypes.UPLOAD_ERROR),
  mapTo({ type: ErrorTypes.SET_ERROR, payload: 'Error saving to our records, try again...' })
)

export const saveToDatabase = (action$) => action$.pipe(
  ofType(DashboardTypes.SAVE_TO_DATABASE),
  map(action => {
    const { filepath, id, timestamp, userId, timesheetTimePeriod } = action
    // get timesheet id, user id, timestamp
    const userTimesheetRef = firebase.database().ref(`/user-timesheets/${userId}/${id}/`)
    userTimesheetRef.set({
      timesheetTimePeriod,
      filepath,
      id,
      userId,
      timestamp
    })
    return { type: DashboardTypes.UPLOAD_SUCCESS }
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

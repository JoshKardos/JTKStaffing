import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators';
import { TYPES as DashboardTypes } from '../Redux/DashboardRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'

export const setTimesheetFileError = (action$) => action$.pipe(
  ofType(DashboardTypes.SET_TIMESHEET_FILE_ERROR),
  map((action) => ({ type: ErrorTypes.SET_ERROR, payload: action.payload }))
)

export default null

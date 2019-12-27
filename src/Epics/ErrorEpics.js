import { ofType } from 'redux-observable'
import { mapTo, filter } from 'rxjs/operators';
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import { TYPES as LayoutTypes } from '../Redux/LayoutRedux'

export const resetErrorOnMenuBarSelectEpic = (action$, state$) => action$.pipe(
  ofType(
    LayoutTypes.SET_HOME_LAYOUT,
    LayoutTypes.SET_LOG_IN_LAYOUT,
    LayoutTypes.SET_SIGN_UP_LAYOUT
  ),
  filter(() => state$.value.ErrorReducers.errorReducer.errorDescription),
  mapTo({ type: ErrorTypes.RESET_ERROR })
)

export default null

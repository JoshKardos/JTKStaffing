import {
  combineEpics,
  ofType
} from 'redux-observable'
import { delay, map } from 'rxjs/operators';
import { TYPES as LayoutTypes } from '../Redux/LayoutRedux'

export const pingEpic = action$ => action$.pipe(
  ofType(LayoutTypes.SET_HOME_LAYOUT),
  delay(500), // Asynchronously wait 1000ms then continue
  map(() => {
    console.log('HELLO')
    return { type: '' }
  })
)

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(
  pingEpic
);

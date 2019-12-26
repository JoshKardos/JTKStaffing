import { ofType } from 'redux-observable'
import { switchMap, mapTo, map } from 'rxjs/operators';
import { TYPES as UserTypes } from '../Redux/UserRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import firebase from '../Firebase/index'

export const signUpEpic = action$ => action$.pipe(
  ofType(UserTypes.SIGN_UP),
  switchMap(action => {
    const { email } = action.payload
    const { password } = action.payload
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      // success
      // change this return
      return { type: UserTypes.START_SIGN_UP_LOADING }
    }).catch((error) => {
      // error
      // const errorCode = error.code
      const errorMessage = error.message
      return { type: ErrorTypes.SET_ERROR, payload: errorMessage }
    })
  })
)

export const setSignUpErrorEpic = action$ => action$.pipe(
  ofType(UserTypes.SET_SIGN_UP_ERROR),
  map((action) => ({ type: ErrorTypes.SET_ERROR, payload: action.payload }))
)

export const startSignUpLoadingEpic = action$ => action$.pipe(
  ofType(UserTypes.SIGN_UP),
  mapTo({ type: UserTypes.START_SIGN_UP_LOADING })
)

export const stopSignUpLoadingEpic = action$ => action$.pipe(
  ofType(ErrorTypes.SET_ERROR), // check for sign up loading state
  mapTo({ type: UserTypes.STOP_SIGN_UP_LOADING })
)

export default null

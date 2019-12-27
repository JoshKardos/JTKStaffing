import { ofType } from 'redux-observable'
import { switchMap, mapTo, map, filter } from 'rxjs/operators';
import { TYPES as UserTypes, userLoggedIn } from '../Redux/UserRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import { TYPES as LayoutTypes } from '../Redux/LayoutRedux'
import firebase from '../Firebase/index'

export const signUpEpic = (action$) => action$.pipe(
  ofType(UserTypes.SIGN_UP),
  switchMap(action => {
    const { name, email, password, company } = action.payload
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
      // success
      const { uid } = value.user
      const ref = firebase.database().ref(`/users/${uid}`)
      ref.set({
        name,
        email,
        company,
        uid
      })
      return { type: UserTypes.SET_USER_DATA, payload: { id: uid, name, email, company } }
    }).catch((error) => {
      // error
      const errorMessage = error.message
      return { type: ErrorTypes.SET_ERROR, payload: errorMessage }
    })
  })
)

export const setSignUpErrorEpic = (action$) => action$.pipe(
  ofType(UserTypes.SET_SIGN_UP_ERROR),
  map((action) => ({ type: ErrorTypes.SET_ERROR, payload: action.payload }))
)

export const startSignUpLoadingEpic = (action$) => action$.pipe(
  ofType(UserTypes.SIGN_UP),
  mapTo({ type: UserTypes.START_SIGN_UP_LOADING })
)

export const stopSignUpLoadingEpic = (action$, state$) => action$.pipe(
  ofType(ErrorTypes.SET_ERROR), // check for sign up loading state
  filter(() => state$.value.UserReducers.userReducer.signUpLoading),
  mapTo({ type: UserTypes.STOP_SIGN_UP_LOADING })
)

export const fetchUserDataEpic = (action$, state$) => action$.pipe(
  ofType(UserTypes.FETCH_USER_DATA),
  filter(() => !userLoggedIn(state$.value.UserReducers.userReducer)),
  switchMap((action) => {
    const userId = action.payload
    return firebase.database().ref(`/users/${userId}`).once('value').then((snapshot) => {
      const name = (snapshot.val() && snapshot.val().name) || 'N/A'
      const email = (snapshot.val() && snapshot.val().email) || 'N/A'
      const company = (snapshot.val() && snapshot.val().company) || 'N/A'
      const id = (snapshot.val() && snapshot.val().uid) || 'N/A'
      return { type: UserTypes.SET_USER_DATA, payload: { id, name, email, company } }
    })
  })
)

export const logOutEpic = (action$) => action$.pipe(
  ofType(UserTypes.LOG_OUT),
  switchMap(() => firebase.auth().signOut().then(() => (
    // Sign-out successful.
    { type: LayoutTypes.SET_LOG_IN_LAYOUT }
  )).catch(error => (
    { type: ErrorTypes.SET_ERROR, payload: error.message }
  )))
)

export default null

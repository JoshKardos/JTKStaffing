import { ofType } from 'redux-observable'
import { switchMap, mapTo, map, filter, flatMap } from 'rxjs/operators';
import { TYPES as UserTypes } from '../Redux/UserRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'
import { TYPES as LayoutTypes, LAYOUTS } from '../Redux/LayoutRedux'
import firebase from '../Firebase/index'
import axios from 'axios'
import { Observable } from 'rxjs';

export const loginEpic = (action$) => action$.pipe(
  ofType(UserTypes.LOGIN),
  switchMap(action => {
    const { email, password } = action
    return firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
      const { uid } = value.user
      return { type: UserTypes.FETCH_USER_DATA, payload: uid }
    }).catch((error) => {
      // error
      const errorMessage = error.message
      return { type: ErrorTypes.SET_ERROR, payload: errorMessage }
    })
  })
)

export const signUpWorkerEpic = (action$, state$) => action$.pipe(
  ofType(UserTypes.SIGN_UP_WORKER),
  switchMap(action => {
    const { name, email, password } = action
    return axios.post('/user/create', {
      email: email,
      password: password
    }).then((result) => {
      const { uid } = result.data
      const usersRef = firebase.database().ref(`/users/${uid}`)
      usersRef.set({
        name,
        email,
        company: state$.value.UserReducers.userReducer.company,
        uid
      })
      const userAdminRef = firebase.database().ref(`/admin-workers/${state$.value.UserReducers.userReducer.id}/${uid}`)
      userAdminRef.set(1)
      return { type: UserTypes.FETCH_USER_DATA, payload: state$.value.UserReducers.userReducer.id }
    }).catch((error) => {
      const { status } = error.response
      const { message } = error.response.data
      console.log(error.response)
      return { type: ErrorTypes.SET_ERROR, payload: message }
    })
  })
)

export const signUpAdminEpic = (action$) => action$.pipe(
  ofType(UserTypes.SIGN_UP_ADMIN),
  switchMap(action => {
    const { name, email, password, company } = action
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
      // success
      const { uid } = value.user
      const ref = firebase.database().ref(`/users/${uid}`)
      ref.set({
        name,
        email,
        company,
        uid,
        admin: true
      })
      return { type: UserTypes.SET_USER_DATA, payload: { id: uid, name, email, company, admin: true } }
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
  ofType(UserTypes.SIGN_UP_ADMIN, UserTypes.SIGN_UP_WORKER),
  mapTo({ type: UserTypes.START_SIGN_UP_LOADING })
)

export const stopSignUpLoadingEpic = (action$, state$) => action$.pipe(
  ofType(ErrorTypes.SET_ERROR, UserTypes.SET_USER_DATA),
  filter(() => state$.value.UserReducers.userReducer.signUpLoading), // only stop sign up loading if it has started
  mapTo({ type: UserTypes.STOP_SIGN_UP_LOADING })
)

export const startLoginLoadingEpic = (action$) => action$.pipe(
  ofType(UserTypes.LOGIN),
  mapTo({ type: UserTypes.START_LOGIN_LOADING })
)

export const stopLoginLoadingEpic = (action$, state$) => action$.pipe(
  ofType(ErrorTypes.SET_ERROR, UserTypes.SET_USER_DATA),
  filter(() => state$.value.UserReducers.userReducer.loginLoading), // only stop sign up loading if it has started
  mapTo({ type: UserTypes.STOP_LOGIN_LOADING })
)

export const fetchUserDataEpic = (action$, state$) => action$.pipe(
  ofType(UserTypes.FETCH_USER_DATA),
  switchMap(action => {
    console.log(action)
    const userId = action.payload
    let employees = []
    return firebase.database().ref(`/users/${userId}`).once('value').then((snapshot) => {
      const name = (snapshot.val() && snapshot.val().name) || 'N/A'
      const email = (snapshot.val() && snapshot.val().email) || 'N/A'
      const company = (snapshot.val() && snapshot.val().company) || 'N/A'
      const id = (snapshot.val() && snapshot.val().uid) || 'N/A'
      const admin = (snapshot.val() && snapshot.val().admin) || null

      if (admin) { // load employees
        return firebase.database().ref(`/admin-workers/${userId}`).once('value').then((adminEmployeesSnapshot) => firebase.database().ref('/users').once('value').then((allUsersSnapshot) => {
          if (!adminEmployeesSnapshot.val()) return { type: UserTypes.SET_USER_DATA, payload: { id, name, email, company, admin } } // has no employees
          Object.keys(allUsersSnapshot.val()).forEach(userId => {
            if (Object.keys(adminEmployeesSnapshot.val()).includes(userId)) {
              employees = [...employees, allUsersSnapshot.val()[`${userId}`]]
            }
          })
          return { type: UserTypes.SET_USER_DATA, payload: { id, name, email, company, admin, employees } }
        }))
      // eslint-disable-next-line no-else-return
      } else { // load timesheets
        return firebase.database().ref(`/user-timesheets/${userId}`).once('value').then(userTimesheetsSnapshot => {
          let timesheetArr = []
          let adminId = ''
          // get admin id
          return firebase.database().ref(`/admin-workers`).once('value').then((adminEmployeesSnapshot) => {
            Object.keys(adminEmployeesSnapshot.val()).some(id => {
              if (Object.keys(adminEmployeesSnapshot.val()[id]).includes(userId)) {
                adminId = id
                return true
              }
              return false
            })
            if (!userTimesheetsSnapshot.val()) return { type: UserTypes.SET_USER_DATA, payload: { id, name, email, company, admin, adminId } }
            Object.keys(userTimesheetsSnapshot.val()).map(key => {
              timesheetArr = [...timesheetArr, userTimesheetsSnapshot.val()[key]]
              // eslint-disable-next-line no-useless-return
              return
            })
            return { type: UserTypes.SET_USER_DATA, payload: { id, name, email, company, admin, timesheets: timesheetArr.reverse(), adminId } }
          })
        })
      }
    })
  })
)

export const homePageAfterLoginOrSignUpEpic = (action$, state$) => action$.pipe(
  ofType(UserTypes.SET_USER_DATA),
  filter(() => state$.value.LayoutReducers.layoutReducer.currentLayout === LAYOUTS.LOGIN || state$.value.LayoutReducers.layoutReducer.currentLayout === LAYOUTS.SIGNUP),
  mapTo({ type: LayoutTypes.SET_HOME_LAYOUT })
)


export const logOutEpic = (action$) => action$.pipe(
  ofType(UserTypes.LOG_OUT),
  switchMap(() => firebase.auth().signOut().then(() => (
    // Sign-out successful.
    { type: LayoutTypes.SET_LOGIN_LAYOUT }
  )).catch(error => (
    { type: ErrorTypes.SET_ERROR, payload: error.message }
  )))
)

export default null

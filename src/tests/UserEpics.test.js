import { assert } from 'chai'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/toArray'
import {
  logOutEpic,
  homePageAfterLoginOrSignUpEpic,
  startLoginLoadingEpic,
  stopLoginLoadingEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  setSignUpErrorEpic,
  loginEpic
} from '../Epics/UserEpics'
import { TYPES as LayoutTypes, LAYOUTS } from '../Redux/LayoutRedux'
import { TYPES as UserTypes } from '../Redux/UserRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'

describe('loginEpic', () => {
  it('dispatches FETCH_USER_DATA after successfully logged in', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.LOGIN, email: 'joshkardos@gmail.com', password: 'pass1234' }
    )
    const expectedOutputAction = { type: UserTypes.FETCH_USER_DATA, payload: '0TmdiEZdK8T545CNxzz1jYMZ5Bz1' }
    loginEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('dispatches SET_ERROR after successfully logged in', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.LOGIN, email: 'joshkardos@gmail.com', password: 'p' }
    )// Password should be at least 6 characters
    const expectedOutputAction = { type: ErrorTypes.SET_ERROR, payload: 'The password is invalid or the user does not have a password.' }
    loginEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
})

describe('setSignUpErrorEpic', () => {
  it('dispatches SET_ERROR after a sign up error', (done) => {
    const error = 'Could not sign in'
    const action$ = ActionsObservable.of(
      { type: UserTypes.SET_SIGN_UP_ERROR, payload: error }
    )
    const expectedOutputAction = { type: ErrorTypes.SET_ERROR, payload: error }
    setSignUpErrorEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
})

describe('startSignUpLoadingEpic', () => {
  it('dispatches START_SIGN_UP_LOADING when user clicks sign up', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.SIGN_UP }
    )
    const expectedOutputAction = { type: UserTypes.START_SIGN_UP_LOADING }
    startSignUpLoadingEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
})

describe('stopSignUpLoadingEpic', () => {
  it('dispatches STOP_SIGN_UP_LOADING when user data is set', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.SET_USER_DATA }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            signUpLoading: true
          }
        }
      }
    }
    const expectedOutputAction = { type: UserTypes.STOP_SIGN_UP_LOADING }
    stopSignUpLoadingEpic(action$, state$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('dispatches STOP_SIGN_UP_LOADING when an error is set', (done) => {
    const action$ = ActionsObservable.of(
      { type: ErrorTypes.SET_ERROR }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            signUpLoading: true
          }
        }
      }
    }
    const expectedOutputAction = { type: UserTypes.STOP_SIGN_UP_LOADING }
    stopSignUpLoadingEpic(action$, state$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('does not dispatch action when an error is set and sign up is not loading', (done) => {
    const action$ = ActionsObservable.of(
      { type: ErrorTypes.SET_ERROR }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            signUpLoading: false
          }
        }
      }
    }
    stopSignUpLoadingEpic(action$, state$)
      .toPromise()
      .then(actualOutputAction => {
        assert.deepEqual(actualOutputAction, undefined)
        done()
      })
  })
})

describe('startLoginLoadingEpic', () => {
  it('dispatches START_LOGIN_LOADING after user clicks log in', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.LOGIN }
    )
    const expectedOutputAction = { type: UserTypes.START_LOGIN_LOADING }
    startLoginLoadingEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
})

describe('stopLoginLoadingEpic', () => {
  it('dispatches STOP_LOGIN_LOADING when user data is set', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.SET_USER_DATA }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            loginLoading: true
          }
        }
      }
    }
    const expectedOutputAction = { type: UserTypes.STOP_LOGIN_LOADING }
    stopLoginLoadingEpic(action$, state$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('dispatches STOP_LOGIN_LOADING when an error is set', (done) => {
    const action$ = ActionsObservable.of(
      { type: ErrorTypes.SET_ERROR }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            loginLoading: true
          }
        }
      }
    }
    const expectedOutputAction = { type: UserTypes.STOP_LOGIN_LOADING }
    stopLoginLoadingEpic(action$, state$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('does not dispatch action when an error is set and log in is not loading', (done) => {
    const action$ = ActionsObservable.of(
      { type: ErrorTypes.SET_ERROR }
    )
    const state$ = {
      value: {
        UserReducers: {
          userReducer: {
            loginLoading: false
          }
        }
      }
    }
    stopLoginLoadingEpic(action$, state$)
      .toPromise()
      .then(actualOutputAction => {
        assert.deepEqual(actualOutputAction, undefined)
        done()
      })
  })
})

describe('logOutEpic', () => {
  it('dispatches SET_LOGIN_LAYOUT after user logs out successfully', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.LOG_OUT }
    )
    const expectedOutputAction = { type: LayoutTypes.SET_LOGIN_LAYOUT }
    logOutEpic(action$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
})

describe('homePageAfterLoginOrSignUpEpic', () => {
  it('dispatches SET_HOME_LAYOUT after setting user data after logging in', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.SET_USER_DATA }
    )
    const state$ = {
      value: {
        LayoutReducers: {
          layoutReducer: {
            currentLayout: LAYOUTS.LOGIN
          }
        }
      }
    }
    const expectedOutputAction = { type: LayoutTypes.SET_HOME_LAYOUT }
    homePageAfterLoginOrSignUpEpic(action$, state$)
      .subscribe(actualOutputAction => {
        assert.deepEqual(actualOutputAction, expectedOutputAction)
        done()
      })
  })
  it('does not dispatch action after SET_USER_DATA', (done) => {
    const action$ = ActionsObservable.of(
      { type: UserTypes.SET_USER_DATA }
    )
    const state$ = {
      value: {
        LayoutReducers: {
          layoutReducer: {
            currentLayout: LAYOUTS.HOME
          }
        }
      }
    }
    homePageAfterLoginOrSignUpEpic(action$, state$)
      .toPromise()
      .then(actualOutputAction => {
        assert.deepEqual(actualOutputAction, undefined)
        done()
      })
  })
})

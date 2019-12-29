import { assert } from 'chai';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import firebase from '../Firebase/index';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import {
  logOutEpic,
  homePageAfterLoginEpic,
  fetchUserDataEpic,
  stopLoginLoadingEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  setSignUpErrorEpic,
  signUpEpic,
  loginEpic
} from '../Epics/UserEpics'
import { TYPES as LayoutTypes, LAYOUTS } from '../Redux/LayoutRedux'
import { TYPES as UserTypes } from '../Redux/UserRedux'
import { TYPES as ErrorTypes } from '../Redux/ErrorRedux'

// describe('loginEpic', () => {
//   it()
// })

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

describe('homePageAfterLoginEpic', () => {
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
    homePageAfterLoginEpic(action$, state$)
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
    homePageAfterLoginEpic(action$, state$)
      .toPromise()
      .then(actions => {
        assert.deepEqual(actions, undefined)
        done()
      });
  })
})


// const action$ = ActionsObservable.of(
//     {type: 'SAVE_FIELD', payload: {url: '/api/endpoint/9999/'}}
// );

// describe('saveFieldEpic Epic', () => {
//     it('dispatches the correct actions when it is successful', (done) => {
//         const ajax = () => Observable.of({});
//         const expectedOutputActions = [{type: "IS_SAVING"}, {type: "SAVING_SUCCESS"}];

//         saveFieldEpic(action$, null, {ajax})
//             .toArray()
//             .subscribe(actualOutputActions => {
//                 assert.deepEqual(actualOutputActions, expectedOutputActions);
//                 done();
//             }
//         );
//     });

//     it('dispatches the correct actions when there is an error', (done) => {
//         const ajax = () => Observable.throw('save failed');
//         const expectedOutputActions = [
//             {type: "IS_SAVING"},
//             {type: "SAVING_ERROR", error: 'save failed'},
//         ];

//         saveFieldEpic(action$, null, {ajax})
//             .toArray()
//             .subscribe(actualOutputActions => {
//                 assert.deepEqual(actualOutputActions, expectedOutputActions);
//                 done();
//             }
//         );
//     });
// });

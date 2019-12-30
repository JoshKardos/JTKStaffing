import { combineEpics } from 'redux-observable'

import {
  signUpEpic,
  startLoginLoadingEpic,
  stopLoginLoadingEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  setSignUpErrorEpic,
  logOutEpic,
  fetchUserDataEpic,
  loginEpic,
  homePageAfterLoginOrSignUpEpic
} from './UserEpics'

import {
  resetErrorOnMenuBarSelectEpic
} from './ErrorEpics'

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(

  // User Epics
  loginEpic,
  startLoginLoadingEpic,
  stopLoginLoadingEpic,
  fetchUserDataEpic,
  logOutEpic,
  setSignUpErrorEpic,
  signUpEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  homePageAfterLoginOrSignUpEpic,

  // Error Epics
  resetErrorOnMenuBarSelectEpic
);

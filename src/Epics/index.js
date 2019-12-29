import { combineEpics } from 'redux-observable'

import {
  signUpEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  setSignUpErrorEpic,
  logOutEpic,
  fetchUserDataEpic,
  loginEpic,
  homePageAfterLoginEpic
} from './UserEpics'

import {
  resetErrorOnMenuBarSelectEpic
} from './ErrorEpics'

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(

  // User Epics
  loginEpic,
  fetchUserDataEpic,
  logOutEpic,
  setSignUpErrorEpic,
  signUpEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  homePageAfterLoginEpic,

  // Error Epics
  resetErrorOnMenuBarSelectEpic
);

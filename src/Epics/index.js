import { combineEpics } from 'redux-observable'

import {
  signUpAdminEpic,
  startLoginLoadingEpic,
  stopLoginLoadingEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  setSignUpErrorEpic,
  logOutEpic,
  fetchUserDataEpic,
  loginEpic,
  homePageAfterLoginOrSignUpEpic,
  signUpWorkerEpic
} from './UserEpics'

import {
  resetErrorOnMenuBarSelectEpic
} from './ErrorEpics'

import {
  saveToDatabase,
  showUploadSuccessEpic,
  uploadErrorEpic,
  uploadCompleteEpic,
  setTimesheetFileError
} from './DashboardEpics'

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(

  // User Epics
  loginEpic,
  startLoginLoadingEpic,
  stopLoginLoadingEpic,
  fetchUserDataEpic,
  logOutEpic,
  setSignUpErrorEpic,
  signUpAdminEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic,
  homePageAfterLoginOrSignUpEpic,
  signUpWorkerEpic,

  // Error Epics
  resetErrorOnMenuBarSelectEpic,

  // Dashboard Epics
  saveToDatabase,
  showUploadSuccessEpic,
  uploadErrorEpic,
  uploadCompleteEpic,
  setTimesheetFileError
);

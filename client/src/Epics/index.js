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
  signUpWorkerEpic,
  editNameEpic,
  editEmailEpic,
  editSuccessEpic,
  editPasswordEpic,
  editPasswordSuccessEpic
} from './UserEpics'

import {
  resetErrorOnMenuBarSelectEpic
} from './ErrorEpics'

import {
  saveToDatabase,
  showUploadSuccessEpic,
  uploadErrorEpic,
  uploadCompleteEpic,
  setTimesheetFileError,
  sendEmailEpic,
  setEdittingSettingsEpic
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
  editNameEpic,
  editEmailEpic,
  editSuccessEpic,
  editPasswordEpic,
  editPasswordSuccessEpic,
  // Error Epics
  resetErrorOnMenuBarSelectEpic,

  // Dashboard Epics
  saveToDatabase,
  showUploadSuccessEpic,
  uploadErrorEpic,
  uploadCompleteEpic,
  setTimesheetFileError,
  sendEmailEpic,
  setEdittingSettingsEpic
);

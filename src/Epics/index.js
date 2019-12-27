import { combineEpics } from 'redux-observable'
import { signUpEpic, startSignUpLoadingEpic, stopSignUpLoadingEpic, setSignUpErrorEpic, logOutEpic, fetchUserDataEpic } from './UserEpics'
import { resetErrorOnMenuBarSelectEpic } from './ErrorEpics'

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(
  fetchUserDataEpic,
  logOutEpic,
  setSignUpErrorEpic,
  signUpEpic,
  resetErrorOnMenuBarSelectEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic
);

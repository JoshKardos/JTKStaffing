import { combineEpics } from 'redux-observable'
import { signUpEpic, startSignUpLoadingEpic, stopSignUpLoadingEpic, setSignUpErrorEpic } from './UserEpics'
import { resetErrorOnMenuBarSelectEpic } from './ErrorEpics'

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(
  setSignUpErrorEpic,
  signUpEpic,
  resetErrorOnMenuBarSelectEpic,
  startSignUpLoadingEpic,
  stopSignUpLoadingEpic
);

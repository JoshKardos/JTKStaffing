import { combineReducers } from 'redux'
import { reducers as LayoutReducers } from './LayoutRedux'
import { reducers as ErrorReducers } from './ErrorRedux'
import { reducers as UserReducers } from './UserRedux'

const rootReducer = combineReducers({
  LayoutReducers,
  ErrorReducers,
  UserReducers
})

export default rootReducer

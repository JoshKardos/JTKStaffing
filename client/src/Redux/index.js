import { combineReducers } from 'redux'
import { reducers as LayoutReducers } from './LayoutRedux'
import { reducers as ErrorReducers } from './ErrorRedux'
import { reducers as UserReducers } from './UserRedux'
import { reducers as DashboardReducers } from './DashboardRedux'

const rootReducer = combineReducers({
  LayoutReducers,
  ErrorReducers,
  UserReducers,
  DashboardReducers
})

export default rootReducer

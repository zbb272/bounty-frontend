import {combineReducers} from 'redux'
import { LOADING_USER, FETCHED_USER, AUTHENTICATED_USER } from './actionType'

//EXAMPLE REDUCER
// const loadingReducer = (oldState=false, action) => {
//   switch (action.type) {
//     case LOADING_PAINTINGS:
//       return true
//     case FETCHED_PAINTINGS:
//       return false
//     default:
//       return oldState
//   }
// }

const userReducer = (oldState=false, action) => {
  switch(action.type){
    case LOADING_USER:
      return true
    case FETCHED_USER:
      return action.payload
    default:
      return oldState
  }
}

const authReducer = (oldState=false, action) => {
  switch(action.type){
    case AUTHENTICATED_USER:
      return true
    default:
      return oldState
  }
}



//map the key: reducer
const rootReducer = combineReducers({
  currentUser: userReducer,
  userAuthenticated: authReducer
  // searchText: searchTextReducer,
  // paintings: paintingsReducer,
  // loading: loadingReducer
})

export default rootReducer

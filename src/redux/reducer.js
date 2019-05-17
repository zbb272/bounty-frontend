import {combineReducers} from 'redux'
import { FETCHED_TARGET_USER, FETCHED_PROJECT, EDIT_USER, CREATING_USER, LOADING_USER, FETCHED_USER, AUTHENTICATED_USER } from './actionType'

const userReducer = (oldState=false, action) => {
  switch(action.type){
    case LOADING_USER:
      return true
    case FETCHED_USER:
      return action.payload
    case CREATING_USER:
      return true
    case EDIT_USER:
      return oldState
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

const projectReducer = (oldState=false, action) => {
  switch(action.type){
    case FETCHED_PROJECT:
      return action.payload
    default:
      return false
  }
}

const targetUserReducer = (oldState=false, action) => {
  switch(action.type){
    case FETCHED_TARGET_USER:
      return action.payload
    default:
      return false
  }
}

const rootReducer = combineReducers({
  currentUser: userReducer,
  userAuthenticated: authReducer,
  currentProject: projectReducer,
  targetUser: targetUserReducer,
})

export default rootReducer

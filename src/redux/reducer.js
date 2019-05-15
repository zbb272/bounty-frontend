import {combineReducers} from 'redux'
// import {CHANGING_SEARCH_TEXT, VOTE_FOR_PAINTING, UPDATE_PAINTING,
//   FETCHED_PAINTINGS, LOADING_PAINTINGS} from './actionType'

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


//map the key: reducer
const rootReducer = combineReducers({
  // searchText: searchTextReducer,
  // paintings: paintingsReducer,
  // loading: loadingReducer
})

export default rootReducer

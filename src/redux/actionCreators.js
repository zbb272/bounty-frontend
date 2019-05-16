// //actionCreators
import { CREATING_USER, FETCHED_USER, LOADING_USER, AUTHENTICATED_USER } from './actionType'

const USERS_URL = 'http://localhost:3000/api/v1/users'

function fetchedUser(userObj){
  return {type: FETCHED_USER, payload: userObj}
}

function loadingUser(){
  return {type: LOADING_USER}
}

function authenticatedUser(){
  return {type: AUTHENTICATED_USER}
}

function loginUser(credentials){
  return (dispatch) => {
    dispatch(loadingUser())
    fetch(USERS_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let user = data.find(user => {
        if(user.email === credentials.email && user.password_digest === credentials.password){
          return true
        }
      })
      if(user === undefined){
        alert("No user found");
      }else {
        console.log(user)
        dispatch(fetchedUser(user))
        dispatch(authenticatedUser())
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      // dispatch(fetchedUser(data))
    })
  }
}

function creatingUser(){
  return {type: CREATING_USER}
}

function createUser(credentials){
  console.log(credentials)
  let userToCreate = {
    username: credentials.username,
    email: credentials.email,
    password_digest: credentials.password
  }
  return (dispatch) => {
    dispatch(creatingUser())
    fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToCreate)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedUser(data))
      dispatch(authenticatedUser())
      localStorage.setItem("currentUser", JSON.stringify(data));
    })
  }
}

export { creatingUser, createUser, fetchedUser, loadingUser, loginUser, authenticatedUser}


//
// function onSearch(searchText){
//   return {type: CHANGING_SEARCH_TEXT, payload: searchText}
// }
//
// function voteForPainting(paintingId){
//   return {type:VOTE_FOR_PAINTING, payload: paintingId}
// }
//
// function updatePaintingInfo(info){
//   return {type:UPDATE_PAINTING, payload: info}
// }
//
// function fetchedPaintings(paintingsArray){
//   return {type: FETCHED_PAINTINGS, payload: paintingsArray}
// }
//
// function loadingPaintings(){
//   return {type: LOADING_PAINTINGS}
// }
//
// function votingForPainting(paintingId){
//   return (dispatch, getState) => {
//     let oldVotes = getState().paintings.find(p => p.id === paintingId).votes
//     fetch(`${URL}/${paintingId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type" : "application/json",
//         "Accept": "application/json"
//       },
//       body: {
//         votes: ++oldVotes
//       }
//     }).then(res => res.json())
//     .then(goodData => {
//       dispatch(voteForPainting(paintingId))
//     })
//     .catch((e) => {
//       alert("Error, problem with server: " + e.toString())
//     })
//   }
// }
//
// function fetchingPaintings(){
//   return (dispatch) => {
//     dispatch(loadingPaintings())
//     fetch(URL)
//     .then(res => res.json())
//     .then(paintingsArray => {
//       // console.log(paintingsArray)
//       dispatch(fetchedPaintings(paintingsArray))
//     })
//   }
// }
// //Problem 1: action creators MUST return objects
// //Want: return a (async)process -> dispatch an action object
// //Problem 2: we don't have access to the dipatch function object
//
//
// export {onSearch, votingForPainting, updatePaintingInfo,
//   fetchingPaintings}

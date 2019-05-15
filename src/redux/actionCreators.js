// //actionCreators
// import {CHANGING_SEARCH_TEXT, VOTE_FOR_PAINTING, UPDATE_PAINTING,
//   FETCHED_PAINTINGS, LOADING_PAINTINGS} from './actionType'
//
// const URL = 'http://localhost:3000/paintings'
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

// //actionCreators
import { FETCHED_BOUNTY, LOGOUT_USER, UNAUTHENTICATE_USER, FETCHED_TARGET_USER, FETCHED_PROJECT, EDIT_USER, CREATING_USER, FETCHED_USER, LOADING_USER, AUTHENTICATED_USER } from './actionType'

const USERS_URL = 'http://localhost:3000/api/v1/users'
const PROJECTS_URL = 'http://localhost:3000/api/v1/projects'
const BOUNTIES_URL = 'http://localhost:3000/api/v1/bounties'
const APPLICATIONS_URL = "http://localhost:3000/api/v1/applications"
const REVIEWS_URL = "http://localhost:3000/api/v1/reviews"

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
        } else{
          return false
        }
      })
      if(user === undefined){
        alert("No user found");
      }else {
        dispatch(fetchedUser(user))
        dispatch(authenticatedUser())
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      // dispatch(fetchedUser(data))
    })
  }
}

function fetchedTargetUser(userObj){
  return {type: FETCHED_TARGET_USER, payload: userObj}
}

function getUserWithId(userId){
  return (dispatch) => {
    fetch(USERS_URL + `/${userId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedTargetUser(data))
    })
  }
}

function creatingUser(){
  return {type: CREATING_USER}
}

function createUser(userToCreate){
  // console.log(credentials)
  // let userToCreate = {
  //   username: credentials.username,
  //   email: credentials.email,
  //   password_digest: credentials.password,
  //   github_url:
  // }
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

function patchingUser(){
  return {type: EDIT_USER}
}

function editUser(userObj){
  return (dispatch) => {
    dispatch(patchingUser())
    fetch(USERS_URL + `/${userObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedUser(data))
      dispatch(authenticatedUser())
      localStorage.setItem("currentUser", JSON.stringify(data));
    })
  }
}

function fetchedProject(projectObj){
  return {type: FETCHED_PROJECT, payload: projectObj}
}

function getProjectWithId(projectId){
  return (dispatch) => {
    fetch(PROJECTS_URL + `/${projectId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedProject(data))
    })
  }
}

function editProject(projObj){
  return (dispatch) => {
    fetch(PROJECTS_URL + `/${projObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedProject(data))
      localStorage.setItem("currentProject", JSON.stringify(data));
    })
  }
}

function fetchedBounty(bountyObj){
  return {type: FETCHED_BOUNTY, payload: bountyObj}
}

function getBountyWithId(bountyId){
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function approveApplication(applicationObj){
  let bountyObj = {
    id: applicationObj.bounty_id,
    user_id: applicationObj.user_id,
    status: "working",
  }
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bountyObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function createApplication(applicationObj){
  return (dispatch) => {
    fetch(APPLICATIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(refreshCurrentUser())
      // dispatch(getUserWithId(data.user.id))
    })
  }
}

function refreshCurrentUser(){
  let user = localStorage.getItem("currentUser");
  user = JSON.parse(user);
  return (dispatch) => {
    fetch(USERS_URL + `/${user.id}`)
    .then(res => res.json())
    .then(user => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(fetchedUser(user))
      console.log("refreshed user")
    })
  }
}

function ownerCompleteBounty(bountyObj){
  let newBountyObj = {...bountyObj,
    status: "completed"
  }
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBountyObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function ownerCancelBounty(bountyObj){
  let newBountyObj = {...bountyObj,
    status: "cancelled by owner"
  }
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBountyObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function createBounty(bountyObj){
  return (dispatch) => {
    fetch(BOUNTIES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bountyObj)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch(refreshCurrentUser())
      // dispatch(getUserWithId(data.user.id))
    })
  }
}

function createProject(projectObj){
  return (dispatch) => {
    fetch(PROJECTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch(refreshCurrentUser())
      // dispatch(getUserWithId(data.user.id))
    })
  }
}

function userCompleteBounty(bountyObj){
  let newBountyObj = {...bountyObj,
    status: "pending"
  }
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBountyObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function userCancelBounty(bountyObj){
  let newBountyObj = {...bountyObj,
    status: "cancelled by user"
  }
  return (dispatch) => {
    fetch(BOUNTIES_URL + `/${bountyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBountyObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedBounty(data))
    })
  }
}

function ownerReviewBounty(reviewObj){
  return (dispatch) => {
    fetch(REVIEWS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(refreshCurrentUser())
      // dispatch(getUserWithId(data.user.id))
    })
  }
}

function userReviewProject(reviewObj){
  return (dispatch) => {
    fetch(REVIEWS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObj)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(refreshCurrentUser())
      // dispatch(getUserWithId(data.user.id))
    })
  }
}

function unAuthenticateUser(){
  return {type: UNAUTHENTICATE_USER}
}

function logoutUser(){
  if(localStorage.hasOwnProperty("currentUser")){
    localStorage.removeItem("currentUser");
  }
  return {type: LOGOUT_USER}
}

export { userReviewProject, ownerReviewBounty, userCancelBounty, userCompleteBounty, createProject, createBounty, createApplication, ownerCancelBounty, ownerCompleteBounty, approveApplication, getBountyWithId, unAuthenticateUser, logoutUser, getUserWithId, editProject, getProjectWithId, editUser, patchingUser, creatingUser, createUser, fetchedUser, loadingUser, loginUser, authenticatedUser}

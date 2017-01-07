// @flow
/**
 *    actions
 *
 * How we send data to our store - Specifying type determines what state is
 * stored and/or retrieved.
 *
 *  using dispatch(function) to send data to the store is easy since it's included
 *   as a prop in every component
 *
 */
// middleware is used to attach out authorization header to API calls
import {
    API_CALL
} from '../middleware/api'
//define Our type for user profile credentials

// type for user profile info
type Profile = {username: string, password: string}

//login ACTION types
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
//logout ACTION types
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
//sentiments ACTION types
export const SENTIMENT_REQUEST = 'SENTIMENT_REQUEST'
export const SENTIMENT_SUCCESS = 'SENTIMENT_SUCCESS'
export const SENTIMENT_FAILURE = 'SENTIMENT_FAILURE'

function requestLogin(creds: Profile) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token,
        username: user.username
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}


// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('token')
        dispatch(receiveLogout())
    }
}

// send sentence to our api: hits our middleware which injects our Authorization
// header
export function sendSentence(sentence: string) {
  console.log(sentence)
    return {
        [API_CALL]: {
            endpoint: "protected/send",
            types: [SENTIMENT_REQUEST, SENTIMENT_SUCCESS, SENTIMENT_FAILURE],
            authenticated: true,
            sentence: sentence
        }
    }
}

// if sentence input value is too long/short, skip api call and set
// warning message
export function failMessage(sentence: string) {
  console.log(sentence)
  return {
      type: SENTIMENT_FAILURE,
      message: sentence
  }
}

/**
 * [loginUser Logins in user]
 * @param  {object} creds [username and password]
 * @return {[results]}       [returns api call results]
 */
export function loginUser(creds: Profile ) {

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${creds.username}&password=${creds.password}`
    }

    return dispatch => {
        dispatch(requestLogin(creds))
        return fetch('http://52.11.14.57:4500/login/user', config)
            .then(response =>
                response.json().then(user => ({
                    user,
                    response
                }))
            ).then(({
                user,
                response
            }) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(user.error))
                    return Promise.reject(user.error)
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('token', user.token)
                        // Dispatch the success action
                    dispatch(receiveLogin(user))
                }
            }).catch(err => console.log('Error: ', err))
    }
}

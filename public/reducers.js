//@flow
/**
 *  Reducers
 *
 * determines the shape of state's store object and changes depending on type
 *
 * We have two reducer functions: auth & sentiments
 *
 * auth : handles our user authentication store
 * sentiments : handles our sentiment api call results
 *
 * We combine these reducers for ease into one app called "sentimentsApp"
 *
 *
 */

import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    SENTIMENT_REQUEST,
    SENTIMENT_SUCCESS,
    SENTIMENT_FAILURE
} from './actions/actions'

/**
 * [auth set's our store data for user login]
 * @param  {Object}  [state] [default state object if none sent]
 * @param  {Boolean} isAuthenticated [is user logined in with valid token?]
 * @return {[object]}                  [returns current state]
 */
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: action.creds
        })
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            errorMessage: ''
        })
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.message
        })
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false
        })
    default:
        return state
    }
}

/**
 * [sentiments set's our store data for sentiment api calls]
 * @param  {Object} [default state object if not sent]
 * @param  {string} sentence      [our user's sentence - reset after submission]
 * @param  {string} sentiment     [sentiment: Good, Negative, Neutral]
 * @param  {string} confidence    [confidence: 0-100 accuracy scale]
 * @param  {string} message       [ error messages due to improper input]
 * @param  {string} authenticated [authentication status]
 * @param  {Object} action        [data including type]
 * @return {object}               [current state]
 */
function sentiments(state = {
    isFetching: false,
    sentence: '',
    sentiment: '',
    confidence: '',
    message: '',
    authenticated: false
}, action) {
    switch (action.type) {
    case SENTIMENT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        })
    case SENTIMENT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            sentence: action.sentence,
            sentiment: action.sentiment,
            confidence: action.confidence,
            authenticated: action.authenticated || false
        })
    case SENTIMENT_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            message: action.message,
            sentence: '',
            sentiment: '',
            confidence: ''
        })
    default:
        return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const sentimentsApp = combineReducers({
    auth,
    sentiments
})

export default sentimentsApp

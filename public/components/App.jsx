// @flow
/**
 *        Container for our app
 *
 * Here is where we set our props and map the state to props
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout, sendSentence } from '../actions/actions'
import  Login  from './Login.jsx'
import  Sentence  from './Sentence.jsx'
//import our styles
import styles from '../css/App.css'



class App extends Component {

	render() {
		const {dispatch, sentence, sentiment, isAuthenticated, confidence, errorMessage, message} = this.props

		return (
	<div className={styles.app}>
    <h2>Hello, Will is here</h2>
    <Login isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} />
    <Sentence isAuthenticated={isAuthenticated} sentence={sentence} sentiment={sentiment} confidence={confidence}  message={message} dispatch={dispatch} />
  </div>
)
	}


}
/**
 * [mapStateToProps map our current states to react props]
 * @param  {[type]} state [redux will attach this]
 * @return {[type]}       [immutable state]
 */
function mapStateToProps(state) {

  const { sentiments, auth} = state
  const { sentence, sentiment, authenticated, confidence, message } = sentiments
  const { isAuthenticated, errorMessage } = auth

  return {
    message,
    confidence,
    sentiment,
    sentence,
    isAuthenticated,
    errorMessage
  }
}

// redux connect attaches our state to our props to the container
export default connect(mapStateToProps)(App)

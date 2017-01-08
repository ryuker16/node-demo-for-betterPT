// @flow
/**
 *        Container for our app
 *
 * Here is where we set our props and map the state to props
 *
 *
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Jumbotron, Button} from 'react-bootstrap'
import {login, logout, sendSentence} from '../actions/actions'
import Login from './Login.jsx'
import Sentence from './Sentence.jsx'
//import our styles
import styles from '../css/style.css'
class App extends Component {
    render() {
        const {
            dispatch,
            sentence,
            sentiment,
            isAuthenticated,
            confidence,
            errorMessage,
            message
        } = this.props
        return (
            <div className='container'>
                <Jumbotron >
                    <h1>Sentiment String Reader</h1>
                    <p>Enter a sentence to find out the sentiments of your statement. Requires logging in first....psst"username: brandon,password: test"</p>
                </Jumbotron>
                <div className='container'>
                    <Login isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch}/>
                    <Sentence isAuthenticated={isAuthenticated} sentence={sentence} sentiment={sentiment} confidence={confidence} message={message} dispatch={dispatch}/>
                </div>
            </div>
        )
    }
}
/**
 * [mapStateToProps map our current states to react props]
 * @param  {state}  [redux will attach this as a prop]
 * @return {[props]}       [our future props!]
 */
function mapStateToProps(state) {
    const {sentiments, auth} = state
    const {sentence, sentiment, authenticated, confidence, message} = sentiments
    const {isAuthenticated, errorMessage} = auth
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
